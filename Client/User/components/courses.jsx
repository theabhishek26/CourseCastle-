//to list all courses

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

function Allcourses()
{
    const[courses,setCourses]=useState([]);
    
    useEffect(()=>{
        fetch('https://coursemaster-c156.onrender.com/users/courses',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                console.log(data.all_courses)
                setCourses(data.all_courses);
                console.log(courses);
            })
        })
    },[])

    if(!courses)
      {
        return(
          <>
          <h1 style={{textAlign:'center'}}>COURSES</h1>
          <Typography variant='h6' style={{ color: 'text.secondary',textAlign:'center'}}>
                No courses Purchased
              </Typography>
          </>
        )
      }


  return(
    <div>
    <Typography variant='h4' style={{textAlign:'center'}}>ALL COURSES</Typography>
<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
{
    courses.map((course)=>{
    return (<Course course={course}></Course>)
    })
}
</div>
</div> 
  )
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
<Button variant="contained" color="success" onClick={()=>{
  window.location='/course/'+props.course._id
}}>
  BUY
</Button>

</div>
  </Card>
    )
}

export default Allcourses;