import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Signin()
{
  const [username,setUsername]=useState();
  const[password,setPassword]=useState();

  return(
    <div style={{textAlign:"center",marginTop:300}}>

    <Typography variant="h6">Sign In to your CourseMaster Account</Typography>

    <Card style={{display:'flex',flexDirection:'column',maxWidth:350,padding:30,margin:'auto',gap:20}}>

        <TextField onChange={(e)=>{
          setUsername(e.target.value);
        }} variant='outlined' label="username"></TextField>

        <TextField onChange={(e)=>{
          setPassword(e.target.value);
        }} variant='outlined' label="password"></TextField>

        <Button variant='contained' onClick={()=>{
           fetch('http://localhost:3000/users/login',{
            method:'POST',
            headers:{
              'username':username,
              'password':password
            }
           }).then((res)=>{
            res.json().then((data)=>{
              if(data.token)
              {
                localStorage.setItem('token',data.token);
                window.location='/courses/purchased'
              }
            })
           })
        }}>SIGN IN</Button>
    </Card>
    </div>
  )
}

export default Signin;