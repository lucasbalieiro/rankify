'use client'
import { validateToken } from "@/app/services/judge"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function LoggedJudge(){

    const router = useRouter()
    async function validateAuthentication() {
        const token = localStorage.getItem("accessToken")

        if(token == null) {
            router.replace("/judge")
        }
        const judge = await validateToken(token)
        if(judge.error){
            localStorage.removeItem("accessToken")
            router.replace("/judge")
        }
    }

    useEffect(() => {
        validateAuthentication().finally();
    }, [])    
    return <h1>Authenticated Area</h1>
}