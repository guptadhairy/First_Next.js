"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();
  const [user,setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onSignUp = async ()=> {
    try {
      const response = await axios.post("/api/users/signup",user);
      console.log("Signup success", response.data);
      router.push("/login");
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if( user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user]);


  return (
   <div className='flex flex-col items-center justify-center min-h-screen py-2'>
    <h1 className='text-2xl mb-3'>Create Account</h1>
    <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus text-black' type='text' value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})} placeholder='username' />
    <input className='text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus' type='text' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})} placeholder='email' />
    <input required={true} className='text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus' type='password' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})} placeholder='password' />
    <button onClick={onSignUp} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
      {buttonDisabled ? "No Signup" : "SignUp"}
    </button>
    <Link href='/login'>Visit Login Page</Link>
   </div>
  )
}

export default page