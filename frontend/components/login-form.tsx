"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router  = useRouter();
  const initialdata = {email:"",password:""}
  const [fromdata,setfromdata] =useState(initialdata);
  const [success,setsuccess] = useState("");
  const [errormessage,seterrormessage] = useState("");

  function handlechange(e:any){
    setfromdata({...fromdata,[e.target.name]:e.target.value});
  }

  async function handlesubmit(e:any){
  e.preventDefault();

  try{
const res= await axios.post("http://localhost:8080/user/login",fromdata);
setsuccess(res.data?.message||"login Successfull");

localStorage.setItem("token",res.data?.token);
seterrormessage("");
router.push("/dashboard");
  }
  catch(err){
if(axios.isAxiosError(err)){
  seterrormessage(err.response?.data?.message ||err.message||"something Went Wrong");

}
else{

    seterrormessage("Unexpected error occurred");
}
  }

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handlechange}
                  value={fromdata.email}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" 
                  name="password"
                  onChange={handlechange}
                  value={fromdata.password}
                type="password" required />
              </Field>
              <Field>
                <span className="text-green-400 text-center">{success}</span>
                 <span className="text-red-400 text-center">{errormessage}</span>
                <Button type="submit" onClick={handlesubmit}>Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
