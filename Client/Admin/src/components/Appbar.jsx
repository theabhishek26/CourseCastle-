import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const server='http://localhost:3000';
const server='https://coursemaster-c156.onrender.com';

function Appbar({navOpen,setNavopen}){

    const[username,setUsername]=useState(null);
    const navigate=useNavigate();

   useEffect(()=>{
    fetch(server+'/admin/me',{
        method:'GET',
        headers:{
           'Authorization':'Bearer '+localStorage.getItem('token'),
           'Content-Type':'application/json'
        }
    }).then((res)=>res.json().then((data)=>{
        if(data.username)
            setUsername(data.username);
    })).catch((err)=>
      console.log(err)
    )},[])
     

    //render only when logged in
    if(username)
    {
        //navopen
    if(navOpen)
        {
            return(
                <div className="border-2 bg-orange-200 flex flex-col lg:w-1/5 md:w-1/3 h-[100vh] md:gap-28 gap-20 p-4  font-afacad" >
                    <div className="logo flex items-center justify-between">
                    <div className="logo text-3xl font-semibold">
                    Course<span className="text-porange font-cursive font-bold ">Master</span>
                    </div>
                    <button class="toggle material-symbols-outlined hover:scale-110 active:scale-95" onClick={()=>{
                        setNavopen(!navOpen);
                    }}>arrow_back</button>
                    </div>
        
                    <div className="profile flex flex-col items-center gap-2">
                        <div className="profile-image w-14 h-14 rounded-full bg-black">
                         
                        </div>
                        <div className="profile-name md:text-3xl text-2xl font-bold">
                           Hello {username}
                        </div>
                    </div>
        
                    <div className="list md:text-2xl text-lg flex flex-col gap-4">
                            {/* <button className="nav-item bg-zinc-300"> <span class="material-symbols-outlined">dashboard</span>
                            <p>Dashboard</p>
                            </button> */}
                            <button className="nav-item" onClick={()=>{
                                navigate('/courses')
                            }}> <span class="material-symbols-outlined">book</span>
                            <p>All courses</p>
                            </button>
                            <button className="nav-item" onClick={()=>{
                                navigate('/addcourse')
                            }}> <span class="material-symbols-outlined">add_business</span>
                            <p>Add Courses</p>
                            </button>
                            {/* <button className="nav-item"> <span class="material-symbols-outlined">person</span>
                            <p>Profile</p>
                            </button> */}
                            <button className="nav-item" onClick={()=>{
                                localStorage.setItem('token',null)
                                // for auto refresh
                                window.location='/signin'
                                
                                // navigate('/signin') TO BE SOLVED SEE app.jsx
                            }}> <span class="material-symbols-outlined" >logout</span>
                            <p>Logout</p>
                            </button>
                    </div>
                </div>
            )
        }
        
    
        //nav closed
        return(
            //made it sticky to be fixed at top while only content scrolls
            <div className="font-afacad flex justify-between items-center bg-orange-200 p-2 sticky top-0 w-full z-10">
    
                <div className="left flex items-center gap-2 justify-center">
                    <button className="material-symbols-outlined border-black border-2 rounded-md p-1 hover:scale-105 active:scale-95" onClick={()=>{
                        setNavopen(!navOpen);
                    }}>menu</button>
    
                    <div className="logo md:text-3xl text-xl font-semibold">
                    Course<span className="text-porange font-cursive font-bold ">Master</span>
                    </div>
                </div>
    
                <div className="mid font-bold lg:text-3xl md:text-2xl text-xl md:flex hidden lg:pr-32 md:pr-20">
                    <p>Welcome Back, {username}</p>
                </div>
    
                <div className="right flex items-center gap-4">
                    <div className="profile-image w-10 h-10 rounded-full bg-black">
                    </div>
                </div>
            </div>
        )
    }

   
}

export default Appbar;