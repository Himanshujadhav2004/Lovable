"use client"
import { useEffect, useState } from "react"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
export default function Page() {

const router= useRouter();
const [useremail,setuseremail]=useState("");
    useEffect(()=>{
const token = localStorage.getItem("token");
if(!token){
    router.push("/login");
}
else{
    const user = jwtDecode(token);
    // console.log(user.email);
    setuseremail(user.name);
}
    },[]);


    function handlelogout(){
        localStorage.removeItem("token");
        router.push("/login");
    }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
    Hi {useremail}

<Button className="bg-red-500 text-white" onClick={handlelogout}>Logout</Button>
      </div>
    </div>
  )
}
