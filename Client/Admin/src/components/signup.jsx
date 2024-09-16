import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React from 'react'
function Signup()
{
    const [email,setEmail]=React.useState()
    const[password,setPassword]=React.useState();

    return(
        <div style={{backgroundColor:'#eeeeee',fontSize:'20px',padding:'200px',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',alignContent:'center'}}>
            
            <Typography variant="h6">
            Welcome to CourseMaster! Sign Up here
            </Typography>
        
        <Card variant="outlined" style={{
            display:'flex',flexDirection:'column',padding:'40px',gap:'20px',width:'300px'
        }}> 
            <TextField onChange={(e)=>{
                setEmail(e.target.value)
            }}label="Username" variant="outlined" size='normal' />

            <TextField onChange={(e)=>{
                setPassword(e.target.value)
            }} label="Password" variant="outlined" />

            <Button variant="contained" onClick={()=>{
                // const username=document.getElementById('username').value;
                // const password=document.getElementById('password').value;
                fetch('https://coursemaster-c156.onrender.com/admin/signup',{
                    method:'POST',
                    body:JSON.stringify({username:email,password:password}),
                    headers:{
                        'content-type':'application/json'
                    }
                }).then((res)=>{
                    res.json().then((data)=>
                    {
                        // console.log(data)
                    //save token to localstorage
                    if(data.token)
                    localStorage.setItem('token',data.token)
                    //for auto refresh once logged in
                    window.location='/courses'
                    }
                )
                })

                

            }}>Sign Up</Button>
        </Card>
       </div>
    )
}

export default Signup;