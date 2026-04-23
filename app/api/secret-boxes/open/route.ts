import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  openSecretBox,
  SecretBoxError,
  SECRET_BOX_ERROR_CODES,
} from '@/lib/services/secret-box-service';

/**
 * POST /api/secret-boxes/open
 *
 * Opens a secret box for the authenticated user.
 * Returns the awarded badge and remaining unopened count.
 */
export async function POST() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Service unavailable', code: SECRET_BOX_ERROR_CODES.SERVER_ERROR },
      { status: 503 }
    );
  }

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized', code: SECRET_BOX_ERROR_CODES.UNAUTHORIZED },
      { status: 401 }
    );
  }

  try {
    const { badge, remainingCount } = await openSecretBox(user.id);

    return NextResponse.json({
      success: true,
      badge: {
        id: badge.id,
        name: badge.name,
        image_url: badge.image_url,
      },
      remaining_count: remainingCount,
    });
  } catch (err) {
    console.error('[POST /api/secret-boxes/open] Error:', err);

    if (err instanceof SecretBoxError) {
      const statusMap: Record<string, number> = {
        [SECRET_BOX_ERROR_CODES.UNAUTHORIZED]: 401,
        [SECRET_BOX_ERROR_CODES.NO_BOXES]: 400,
        [SECRET_BOX_ERROR_CODES.RATE_LIMITED]: 429,
        [SECRET_BOX_ERROR_CODES.SERVER_ERROR]: 500,
      };

      return NextResponse.json(
        { success: false, error: err.message, code: err.code },
        { status: statusMap[err.code] ?? 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error', code: SECRET_BOX_ERROR_CODES.SERVER_ERROR },
      { status: 500 }
    );
  }
}
