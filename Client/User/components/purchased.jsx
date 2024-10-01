import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

function PurchasedCourses()
{
   const[purchased,setPurchased]=useState([]);

   useEffect(()=>{
    fetch('https://coursemaster-c156.onrender.com/users/purchasedCourses',{
        method:'GET',
        headers:{
            Authorization:'Bearer '+localStorage.getItem('token')
        }
    }).then((res)=>{
        res.json().then((data)=>{
            if(data.purchased)  //necesssary for geting empty array in case no purchased courses
            setPurchased(data.purchased);
        })
    }).catch((err)=>alert(err))

   },[])

   if(!purchased)
   {
    return(
      <Typography variant='h6' style={{textAlign:'center'}}>No Purchased Courses</Typography>
    )
   }

   else
   {
    return(
      <div>
         <Typography variant='h6' style={{textAlign:'center'}}>Purchased Courses</Typography>
         <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
         {
           purchased.map((e)=>{
             return(
             <Course course={e}></Course>
             )
           })
         }
         </div>
      </div>
    )
   }
  
}

//course component
function Course(props)
{
    return(
    <Card style={{display:'flex',flexDirection:'column',justifyContent:'space-between', margin:10,maxWidth: 345}}>
    <CardMedia
      sx={{ height: 140 }}
      image={props.course.imageLink}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      {props.course.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {props.course.description}
      </Typography>
      <Typography variant='h6'>
       Price:{props.course.price}
      </Typography>
    </CardContent>

    <div style={{display:'flex',gap:20}}>
<Button variant="contained" color="secondary" onClick={()=>{
  window.location='/course/'+props.course._id
}}>
  VIEW COURSE
</Button>

</div>
  </Card>
    )
}

export default PurchasedCourses;