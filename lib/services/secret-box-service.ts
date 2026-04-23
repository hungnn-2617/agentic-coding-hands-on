import { createClient } from '@/lib/supabase/server';
import type { Badge, SecretBox } from '@/types/secret-box';

/**
 * Error codes for secret box operations
 */
export const SECRET_BOX_ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  NO_BOXES: 'NO_BOXES',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

export type SecretBoxErrorCode = (typeof SECRET_BOX_ERROR_CODES)[keyof typeof SECRET_BOX_ERROR_CODES];

/**
 * Custom error class for secret box operations
 */
export class SecretBoxError extends Error {
  code: SecretBoxErrorCode;

  constructor(message: string, code: SecretBoxErrorCode) {
    super(message);
    this.name = 'SecretBoxError';
    this.code = code;
  }
}

/**
 * Get the count of unopened secret boxes for a user
 */
export async function getUserUnopenedCount(userId: string): Promise<number> {
  const supabase = await createClient();
  if (!supabase) {
    throw new SecretBoxError('Service unavailable', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
  }

  const { count, error } = await supabase
    .from('secret_boxes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_opened', false);

  if (error) {
    console.error('[getUserUnopenedCount] Error:', error);
    throw new SecretBoxError('Failed to fetch count', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
  }

  return count ?? 0;
}

/**
 * Get all available badges from the database
 */
export async function getAllBadges(): Promise<Badge[]> {
  const supabase = await createClient();
  if (!supabase) {
    throw new SecretBoxError('Service unavailable', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
  }

  const { data: badges, error } = await supabase
    .from('badges')
    .select('*')
    .order('drop_rate', { ascending: false });

  if (error) {
    console.error('[getAllBadges] Error:', error);
    throw new SecretBoxError('Failed to fetch badges', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
  }

  return (badges ?? []) as Badge[];
}

/**
 * Select a random badge based on probability weights (drop_rate)
 * Uses weighted random selection algorithm
 */
export function selectRandomBadge(badges: Badge[]): Badge {
  if (badges.length === 0) {
    throw new SecretBoxError('No badges available', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
  }

  // Calculate total weight (sum of all drop rates)
  const totalWeight = badges.reduce((sum, badge) => sum + badge.drop_rate, 0);

  // Generate random number between 0 and total weight
  let random = Math.random() * totalWeight;

  // Select badge based on weighted probability
  for (const badge of badges) {
    random -= badge.drop_rate;
    if (random <= 0) {
      return badge;
    }
  }

  // Fallback to last badge (should rarely happen due to floating point)
  return badges[badges.length - 1];
}

/**
 * Open a secret box for a user
 * - Selects an unopened box
 * - Assigns a random badge based on probability weights
 * - Updates the box as opened
 *
 * @returns The awarded badge and remaining unopened count
 */
export async function openSecretBox(
  userId: string
): Promise<{ badge: Badge; remainingCount: number }> {
  const supabase = await createClient();
  if (!supabase) {
    throw new SecretBoxError('Service unavailable', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
  }

  // Step 1: Find an unopened box for this user
  const { data: unopenedBox, error: boxError } = await supabase
    .from('secret_boxes')
    .select('id')
    .eq('user_id', userId)
    .eq('is_opened', false)
    .limit(1)
    .single();

  if (boxError || !unopenedBox) {
    console.error('[openSecretBox] No unopened box found:', boxError);
    throw new SecretBoxError('No unopened boxes available', SECRET_BOX_ERROR_CODES.NO_BOXES);
  }

  // Step 2: Get all badges and select one randomly
  const badges = await getAllBadges();
  const selectedBadge = selectRandomBadge(badges);

  // Step 3: Update the box as opened with the badge
  const { error: updateError } = await supabase
    .from('secret_boxes')
    .update({
      is_opened: true,
      badge_id: selectedBadge.id,
      opened_at: new Date().toISOString(),
    })
    .eq('id', unopenedBox.id)
    .eq('user_id', userId) // Extra safety check
    .eq('is_opened', false); // Prevent double-open race condition

  if (updateError) {
    console.error('[openSecretBox] Error updating box:', updateError);
    throw new SecretBoxError('Failed to open box', SECRET_BOX_ERROR_CODES.SERVER_ERROR);
  }

  // Step 4: Get remaining count
  const remainingCount = await getUserUnopenedCount(userId);

  return {
    badge: selectedBadge,
    remainingCount,
  };
}

/**
 * Validate that a user has at least one unopened box
 */
export async function validateCanOpenBox(userId: string): Promise<boolean> {
  const count = await getUserUnopenedCount(userId);
  return count > 0;
}
