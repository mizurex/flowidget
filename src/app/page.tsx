import Footer from "@/components/sections/Footer";

import Hero from "@/components/sections/Hero";
import { createSupabaseServer } from "@/lib/supabase-server";


export default async function Home() {

  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
    <Hero initialUser={user}/>
    
    </div>
    
  );
}
