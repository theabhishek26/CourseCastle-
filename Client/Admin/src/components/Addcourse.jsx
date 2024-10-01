import React from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Addcourse()
{
    const[title,setTitle]=React.useState()
    const[description,setDescription]=React.useState()
    const[price,setPrice]=React.useState()
    const[imageLink,setImageLink]=React.useState()

  return(
    <>
       <Card style={{marginTop:'20px',backgroundColor:'#eeeeee'}}>
       <Typography variant="h4" style={{textAlign:'center'}}>
           ADD COURSE
        </Typography>
       <div style={{
          display:'flex',flexDirection:'column',
          padding:'80px'
       }}>
       <TextField onChange={(e)=>{
          setTitle(e.target.value)
       }} label="Title" variant="outlined" />

       <TextField onChange={(e)=>{
        setDescription(e.target.value)
       }} label="Description" variant="outlined" />

       <TextField onChange={(e)=>{
        setPrice(e.target.value)
       }}  label="Price" variant="outlined" />

       <TextField onChange={(e)=>{
        setImageLink(e.target.value)
       }}  label="Image-Link" variant="outlined" />

       <Button variant="contained" onClick={()=>{
         fetch('https://coursemaster-c156.onrender.com/admin/courses',{
            method:'POST',
            headers:{'Authorization':'Bearer'+' '+localStorage.getItem('token'),
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,description,price,imageLink,published:true
            })
         }).then((res)=>{
            if(res)
            {
               window.location='/courses'
               alert('course added')
            }
         })
       }}>Add Course</Button>
       </div>
       </Card>       
    </>
  )
}

export default Addcourse;