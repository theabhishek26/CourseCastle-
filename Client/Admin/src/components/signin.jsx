import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React from 'react'

function Signin()
{
    const[email,setEmail]=React.useState();
    const[password,setPassword]=React.useState();

    return(
        <div style={{backgroundColor:'#eeeeee',fontSize:'20px',padding:'200px',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',alignContent:'center'}}>
            <Typography variant="h6">
            Welcome! Login to CourseMaster
            </Typography>
        
        <Card variant="outlined" style={{
            display:'flex',flexDirection:'column',padding:'40px',gap:'20px',width:'300px'
        }}> 
            <TextField onChange={(e)=>{
                setEmail(e.target.value)
            }} label="Username" variant="outlined" size='normal' />

            <TextField onChange={(e)=>{
                setPassword(e.target.value)
            }}  label="Password" variant="outlined" />

            <Button variant="contained" onClick={()=>{
                fetch('http://localhost:3000/admin/login',{
                    method:'POST',
                    headers:{'username':email,'password':password,
                        'content-type':'application/json'
                    }
                }).then((res)=>{
                    res.json().then((data)=>{
                        if(data.token)
                            localStorage.setItem('token',data.token);
                        //for auto refresh once logged in
                        window.location='/courses'
                    })
                })

                
            }}>Login</Button>
        </Card>
       </div>
    )
}

export default Signin;