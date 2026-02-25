import LoginPage from "@/components/widget/Signin"
import { MoveLeft } from "lucide-react"
import Link from "next/link"
import EditorialLines from "@/components/hero/hero-lines"
import RulerTicks from "@/components/hero/morph"
import DiagonalPattern from "@/components/hero/pattern"


export default function (){
  return (
      <div className="relative bg-background "> 
      
      <EditorialLines />
        <RulerTicks />
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />
      <LoginPage/>
 
      </div>
  )
}