import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// const server='http://localhost:3000'
const server='https://coursemaster-c156.onrender.com';


function BuyCourse()
{
   let {courseId}=useParams();
   const[course,setCourse]=useState({});

   useEffect(()=>{
      fetch(server+'/user/course/'+courseId,{
         method:'GET',
         headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
         }
      }).then((res)=>{
         res.json().then((data)=>{
            setCourse(data.course)
         })
      })
   
   },[])
   
   return(
    <div>
      <Coursecomp course={course}></Coursecomp>
    </div>
   )
}

//display course
function Coursecomp(props)
{
  return(
   <Card style={{maxWidth:800,minWidth:300,margin:'auto',marginTop:100}}>
   <CardMedia
     sx={{ height: 300 }}
     image={props.course.imageLink}
   />
   <CardContent>
     <Typography gutterBottom variant="h5" component="div">
       {props.course.title}
     </Typography>
     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
     {props.course.description}
     </Typography>
   </CardContent>
   <CardActions>
   <Button variant="contained" color="success" style={{width:400,margin:'auto'}} onClick={()=>{
      fetch(server+'/user/courses/'+props.course._id,{
         method:'POST',
         headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
         }
      }).then(()=>{
         alert('course Purchased!')
         window.location.href='/courses/purchased'
      }).catch((err)=>alert(err))
   }}>
  BUY-{props.course.price}
</Button>
<Typography varinat='h5' color="error">Don't buy if already brought-VISIT Purchased Courses</Typography>
   </CardActions>
 </Card>
  )
}

export default BuyCourse;