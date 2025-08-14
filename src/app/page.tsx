import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { createSupabaseServer } from "@/lib/supabase-server";
import Image from "next/image";

export default async function Home() {

  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
    <Hero initialUser={user}/>
    <Footer/>
    </div>
    
  );
}
