import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  getUserUnopenedCount,
  SecretBoxError,
  SECRET_BOX_ERROR_CODES,
} from '@/lib/services/secret-box-service';

/**
 * GET /api/secret-boxes/count
 *
 * Returns the count of unopened secret boxes for the authenticated user.
 */
export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Service unavailable', code: SECRET_BOX_ERROR_CODES.SERVER_ERROR },
      { status: 503 }
    );
  }

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized', code: SECRET_BOX_ERROR_CODES.UNAUTHORIZED },
      { status: 401 }
    );
  }

  try {
    const unopenedCount = await getUserUnopenedCount(user.id);

    return NextResponse.json({ unopened_count: unopenedCount });
  } catch (err) {
    console.error('[GET /api/secret-boxes/count] Error:', err);

    if (err instanceof SecretBoxError) {
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', code: SECRET_BOX_ERROR_CODES.SERVER_ERROR },
      { status: 500 }
    );
  }
}
