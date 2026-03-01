import LoginPage from "@/components/widget/Signin"
import { MoveLeft } from "lucide-react"
import Link from "next/link"
import Lines from "@/components/ui/lines"
import Morph from "@/components/hero/morph"
import DiagonalPattern from "@/components/ui/pattern"


export default function (){
  return (
      <div className="relative bg-black "> 
      
      <Lines />
        <Morph />
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />
      <LoginPage/>
 
      </div>
  )
}