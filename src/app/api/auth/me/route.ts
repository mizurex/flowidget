// app/api/auth/me/route.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return Response.json({ user: null });
}

console.log("me running")
return Response.json({
  data: {
    email: user.email,
    createdAt: user.created_at,
    id: user.id
  }
});

}
