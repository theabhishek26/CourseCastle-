import TextField from '@mui/material/TextField';
import React, { useState } from 'react'
import image from '../assets/login.jpg'
import { useNavigate } from 'react-router-dom';
import Loader from './loader';


// const server='http://localhost:3000';
const server='https://coursemaster-c156.onrender.com';


function Signup(){
    const navigate=useNavigate();
    const [email,setEmail]=useState();
    const[password,setPassword]=useState();
    
    //for mesage after signup
    const [message,setMessage]=useState(null);

    //for showing loader
    const [loader,setLoader]=useState(false);

   return(

       <div className='h-[100vh] flex flex-col justify-between bg-orange-50 font-afacad'>
            
            {/* loader */}
        <   Loader showloader={loader}></Loader>

            <div className="logo left-2 top-2 absolute text-3xl font-semibold z-10 lg:text-black md:text-white">
               Course<span className="text-porange font-cursive font-bold ">Master</span>
               </div>

           <div className=" grid lg:grid-cols-2 h-full">

               <div className="left flex flex-col justify-center items-center gap-10 z-10  w-fit h-fit m-auto lg:bg-transparent md:bg-gray-300 lg:p-0 md:p-8 md:rounded-2xl opacity-100 md:gap-16">

               <div className="login-text flex flex-col items-center">
                <span className=' md:text-4xl text-2xl font-semibold'>Create your account!</span>
                <span className='text-zinc-500 md:text-xl'>The Faster you fill up, the faster you'll learn</span>
                </div>
                <div className="form font-bold lg:text-lg md:text-xl text-lg flex flex-col items-center gap-5">
                   <div className="email">
                       <p className='mb-2'>Name</p>
                       <TextField placeholder="Enter your name" variant="outlined"  className='md:w-96 w-72' />
                   </div>
                   <div className="email">
                       <p className='mb-2'>Email</p>
                       <TextField placeholder="Enter your email" variant="outlined"  className='md:w-96 w-72' onChange={(e)=>{
                        setEmail(e.target.value)
                       }}/>
                   </div>
                   <div className="password">
                       <p className='mb-2'>Password</p>
                       <TextField placeholder="Enter your password" variant="outlined" className='md:w-96 w-72' onChange={(e)=>{
                        setPassword(e.target.value)
                       }}/>
                   </div>
                </div>
                
                {/* remember and new user */}
                <div className="btns flex flex-col items-center gap-4">

                <div className='md:flex lg:flex-row lg:gap-24 flex flex-col gap-4 lg:text-xl md:text-2xl'>
                   <div className="remember flex">
                   <input className='accent-red-500' type="checkbox" name="" id="" />
                   <p>Remember me</p>
                   </div>
                   <div className="new-user ">
                   <p className=' flex gap-1'>Already a user?<button className='font-bold' onClick={()=>{
                       navigate('/signin')
                   }}>Sign in</button></p>
                   </div>
               </div>

                   <button class="relative flex md:h-12 md:w-96 w-36 h-10 items-center justify-center overflow-hidden  text-white transition-all bg-black before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white hover:text-black hover:font-bold before:duration-500 before:ease-out hover:before:h-56 hover:before:w-[600px] active:scale-95" onClick={()=>{
                    setLoader(true);
                    fetch(server+'/admin/signup',{
                        method:'POST',
                        headers:{
                            'content-type':'application/json',
                        },
                        body:JSON.stringify({username:email,password:password})
                    }).then((res)=>res.json().then((data)=>{

                        setLoader(false);
                            
                        //for showing message
                        setMessage(data.message);

                        setTimeout(()=>{
                            setMessage(null)

                            if(data.token)
                                {
                                    localStorage.setItem('token',data.token);
                                    
                                    //reloading required
                                    window.location='/courses'
                                }
                        },900)
                             
                    }))
                   }}>
                   <span class="relative z-10 flex items-center gap-1 md:text-2xl text-lg">Create Account</span>
                   </button>

               </div>
            </div>

               <div className="right lg:flex lg:static items-center md:absolute md:flex hidden max-lg:blur-sm">
                   <img src={image} alt="image error" className='w-full lg:h-full object-cover md:h-[100vh]'/>
               </div>

           </div>

            {/* for displaying quick message after login */}
            <div className={"message items-center justify-center absolute lg:w-2/12 lg:h-1/3  md:h-1/3 w-1/2 h-1/3 top-1/3 lg:left-1/3 left-1/4 m-auto border-black border-2 bg-zinc-600 text-white rounded-xl md:text-3xl opacity-80 z-20 animate-ping font-bold"+(message?' flex':' hidden')}>
                  <p>{message}</p>
                </div>

       </div>
   )
}

export default Signup;