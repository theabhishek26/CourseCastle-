import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'

function Signup()
{
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();

  return(
    <div style={{marginTop:300,textAlign:'center'}}>
    <Typography variant="h6" component="h2">
     Welcome to CourseMaster!Sign Up here
    </Typography>
  
    <Card variant="outlined" style={{display:'flex',flexDirection:'column',maxWidth:350,margin:'auto',gap:15,padding:40}}>

    <TextField id="outlined-basic" label="username" variant="outlined" onChange={(e)=>{
        setUsername(e.target.value)
    }}/>
    <TextField id="outlined-basic" label="password" variant="outlined"
    onChange={(e)=>{
      setPassword(e.target.value)
    }}/>

    <Button variant="contained" onClick={()=>{
      fetch('http://localhost:3000/users/signup',{method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,password})
    }).then((res)=>res.json().then((data)=>{
      if(data.token)
        {
          localStorage.setItem('token',data.token);
          window.location='/courses/purchased'
        }
    }))
    }}>SIGN UP</Button>
    </Card>
    </div>
  )
}

export default Signup;