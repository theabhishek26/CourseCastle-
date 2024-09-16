import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Appbar()
{
  const navigate=useNavigate()
  
  //for rendering after logged in
  const[email,setEmail]=useState(null);


  //for adding conditional rendering once logged in
  useEffect(()=>{
    fetch('https://coursemaster-c156.onrender.com/admin/me',{
      method:'GET',
      headers:{
        'Authorization':'Bearer '+localStorage.getItem('token'),
        'Content-Type':'application/json'
      }
    }  
    ).then((res)=>{
      res.json().then((data)=>setEmail(data.username));
    })
  },[])


  //render this on appbar once logged in
  if(email)
  {
    return (
      <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
          <Typography variant='h5'>CourseMaster</Typography>
          <div>
            {email}
          <Button variant="contained" onClick={()=>{
              localStorage.setItem('token',null)

              //for auto refresh
              window.location='/signin'
          }} >logout</Button>
          </div>
      </div>
    )
  }

  //else render this 
  return (
    <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
        <Typography variant='h5'>CourseMaster</Typography>
        <div>
        <Button variant="contained" onClick={()=>{
            navigate('/signup')
        }} >Sign Up</Button>

        <Button variant="contained" onClick={()=>navigate('/signin')} style={{marginLeft:'5px'}}>Sign In</Button>

        </div>
    </div>
  )
}

export default Appbar;