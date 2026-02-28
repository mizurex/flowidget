import UiDashBoard from "@/components/DashBoard-ui";
import Footer from "@/components/sections/Footer";
import LoginPage from "@/components/widget/Signin";
import { createSupabaseServer } from "@/lib/supabase-server";

export default async function(){
    const supabase  = await createSupabaseServer();

    const {data:{user}} = await supabase.auth.getUser();
    if(!user) {
        return <LoginPage />;
    }
    return(
        <>
        <UiDashBoard initialUser={user}/>
        </>
    )
}