// app/api/user-signin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
  }

  // Find user
  const { data, error } = await supabase
    .from('chunks')
    .select('user_id, password')
    .eq('username', username)
    .single(); // expect one row

  if (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }


  if (data.password !== password) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  return NextResponse.json({ success: true, uuid: data.user_id });
}
