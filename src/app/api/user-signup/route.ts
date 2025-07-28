// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import supabase from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
  }

  // Create a unique ID
  const user_id = randomUUID();

  const { data, error } = await supabase.from('chunks').insert([{ username,user_id }]);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Signup failed', details: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, user_id});
}


