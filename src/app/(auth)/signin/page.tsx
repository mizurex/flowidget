import Footer from "@/components/sections/Footer"
import Header from "@/components/sections/Header"
import LoginPage from "@/components/widget/Signin"
import { MoveLeft } from "lucide-react"
import Link from "next/link"


export default function (){
  return (
      <div className="relative"> 
      <div className="top-0 left-0 absolute">
        <Link href="/">
         <MoveLeft className="text-white"/>
        </Link>  
      </div>
      <LoginPage/>
      <Footer/>
      </div>
  )
}