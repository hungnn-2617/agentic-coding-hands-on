import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createKudo } from '@/lib/services/kudo-service';
import type { CreateKudoPayload } from '@/types/kudo';

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
    const body: CreateKudoPayload = await request.json();
    const kudo = await createKudo(body, user.id);
    return NextResponse.json({ data: kudo }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/kudos] Error:', err);
    const message = err instanceof Error ? err.message : 'Failed to create kudo';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
