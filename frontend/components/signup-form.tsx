"use client"
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
import axios, { Axios } from "axios"
import { useRouter } from "next/navigation"


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const initaildata={email:'',name:'',password:'',cpassword:''}

  const [errormessage,seterrormessage]=useState("");
    const [message,setmessage]=useState("");
  const [formdata,setformdata]=useState(initaildata);
  function handlechange(e:any){
setformdata({...formdata,[e.target.name]:e.target.value});
  }

 async function handlesubmit(e:any){
    e.preventDefault();
    try{

   if(formdata.cpassword!=formdata.password){
      seterrormessage("Both password must be same")
    }
    else{
         const response = await axios.post('http://localhost:8080/user/signup',formdata);
   
setmessage(response.data?.message || "Account created successfully");
router.push('/login');
seterrormessage("");
setformdata(initaildata);
    
    }

    }
catch (err: any) {
  if (axios.isAxiosError(err)) {
    seterrormessage(
      err.response?.data?.message || err.message || "Something went wrong"
    );
  } else {
    seterrormessage("Unexpected error occurred");
  }
}



    
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" onChange={handlechange} value={formdata.name} type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                value={formdata.email}
                onChange={handlechange} 
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" onChange={handlechange}  value={formdata.password} type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" value={formdata.cpassword} name="cpassword" onChange={handlechange} type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" onClick={handlesubmit}>Create Account</Button>
                <p className="text-center text-red-500">{errormessage}</p>
<p className="text-center text-green-500">{message}</p>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
