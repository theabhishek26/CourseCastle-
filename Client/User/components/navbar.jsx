import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar()
{
  const navigate=useNavigate();

  const [username,setUsername]=useState(null);

  useEffect(()=>{
    fetch('https://coursemaster-c156.onrender.com/users/me',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      }
    }).then((res)=>res.json().then((data)=>{
      setUsername(data.username);
    }))
  },[])
 
  if(username)
  {
    return(

      <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#E5E4E2',padding:10}}>
        <Typography variant="h5">CourseMaster</Typography>
        <div style={{display:'flex',gap:10}}>
        <Typography variant="p">{username}</Typography>

        <Button variant="contained" onClick={()=>{
          window.location='/courses'
        }}>ALL COURSES</Button>

        <Button variant="contained" color="error" onClick={()=>{
              localStorage.setItem('token',null);
              window.location='/signin';
            }}>LOGOUT</Button>
        </div>
    </div>

    )
  }

  return(
    <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#E5E4E2',padding:10}}>
        <Typography variant="h5">CourseMaster</Typography>
        <div style={{display:'flex',gap:10}}>
            <Button variant="contained" onClick={()=>{
              navigate('/signup')
            }}>SIGN UP</Button>

            <Button variant="contained" onClick={()=>{
              navigate('/signin')
            }}>SIGN IN</Button>
        </div>
    </div>
  )
}

export default Navbar;