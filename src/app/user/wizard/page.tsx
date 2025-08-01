import RedesignedDashboard from "@/components/Dashboard";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

async function checkExistingWidget(userId: string) {
  try {
    const res = await fetch(`https://widget-xxtv.onrender.com/get-widget?user_id=${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.content) return null;

    const lines = data.content.split("\n");
    const parsedWidget: any = {
      id: data.id,
      created_at: data.created_at,
    };

    lines.forEach((line: string) => {
      if (line.startsWith("Bot Name:")) parsedWidget.bot_name = line.replace("Bot Name:", "").trim();
      else if (line.startsWith("Welcome Message:")) parsedWidget.welcome_message = line.replace("Welcome Message:", "").trim();
      else if (line.startsWith("Role:")) parsedWidget.role = line.replace("Role:", "").trim();
      else if (line.startsWith("Content:")) parsedWidget.content = line.replace("Content:", "").trim();
    });

    return parsedWidget;
  } catch (error) {
    console.error("Error fetching widget:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // This won't work in server components, but we need it for the API
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore errors in server components
          }
        },
      },
    }
  );


  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session?.user) {
    console.log("No session found, redirecting to login");
    redirect('/');
  }

  const user:User = session.user;
  const widget = await checkExistingWidget(user.id);

  return <RedesignedDashboard user={user} widget={widget} />;
}