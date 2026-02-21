import UiDashBoard from "@/components/DashBoard-ui";
import Footer from "@/components/sections/Footer";
import { createSupabaseServer } from "@/lib/supabase-server";

export default async function(){
    const supabase  = await createSupabaseServer();

    const {data:{user}} = await supabase.auth.getUser();
    return(
        <>
        <UiDashBoard initialUser={user}/>
  
        </>
    )
}