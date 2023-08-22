"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'


const page = () => {
  const router = useRouter();
  const [user,setUser] = React.useState({
    email: "",
    password: ""
  })

  const onSignUp = async ()=> {
    try {
      const response = await axios.post("/api/users/login",user);
      console.log("Login Success", response.data);
      router.push("/profile");

    } catch (error:any) {
      console.log("Login failed",error.message);
      router.push("/");
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
     <h1 className='text-2xl mb-3'>Welcome Back</h1>
     <input className='text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus' type='text' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})} placeholder='email' />
     <input className='text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus' type='password' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})} placeholder='password' />
     <button onClick={onSignUp} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
       Log In
     </button>
     <Link href='/signup'>Visit Signup Page</Link>
    </div>
   )
}

export default page
