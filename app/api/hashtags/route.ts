import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getHashtags, createHashtag } from '@/lib/services/hashtag-service';

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const hashtags = await getHashtags();
    return NextResponse.json({ data: hashtags });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch hashtags' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = body.name;

    // SECURITY: Input validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Hashtag name is required' }, { status: 400 });
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 1 || trimmedName.length > 100) {
      return NextResponse.json({ error: 'Hashtag name must be 1-100 characters' }, { status: 400 });
    }

    // SECURITY: Only allow alphanumeric, spaces, and basic punctuation
    const validHashtagPattern = /^[\p{L}\p{N}\s\-_]+$/u;
    if (!validHashtagPattern.test(trimmedName)) {
      return NextResponse.json({ error: 'Invalid hashtag format' }, { status: 400 });
    }

    const hashtag = await createHashtag(trimmedName, user.id);
    return NextResponse.json({ data: hashtag }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create hashtag';
    const status = message === 'Hashtag already exists' ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
