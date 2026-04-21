import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { searchUsers } from '@/lib/services/user-service';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const query = request.nextUrl.searchParams.get('q') ?? '';
  if (query.length < 1) {
    return NextResponse.json({ data: [] });
  }

  try {
    const results = await searchUsers(query, user.id);
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('User search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
