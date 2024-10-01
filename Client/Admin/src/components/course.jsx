//updated code using recoil

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LinearIndeterminate from './loader';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';


function Course(){
   let {courseId}=useParams();  //OR let courseId=useParams().courseId;
   //to store course with given id
  //  const[course,setCourse]=React.useState({});

  //use recoil atom in place of state variable above
  //only need to set course here, no need to subscribe to courses
  const setCourse=useSetRecoilState(courseState);

   useEffect(()=>{
    fetch('https://coursemaster-c156.onrender.com/admin/course/'+courseId,{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
        } 
       }).then((res)=>res.json().then((data)=>
        {
           setCourse(data.course);
        }));
   },[])
   
  

   return (
    <>
    <div style={{backgroundColor:'#EEEEEE',display:'flex',flexDirection:'column',gap:'10px'}}>
    
    {/* <Coursecomp course={course}></Coursecomp>
    <Updatecourse id={courseId} setCourse={setCourse}></Updatecourse> */}

    {/* above code without recoil below with recoil */}

    <Coursecomp></Coursecomp>
    <Updatecourse id={courseId}></Updatecourse>
    </div>
    </>
   )
}


//component for showing a course
function Coursecomp()
{
    //without recoil we did it with 
    //here no need to set courses just need to subscribe to coursestate atom
    const course=useRecoilValue(courseState);

    //loader
    if(Object.keys(course).length==0)
    return(
        <div>
            <LinearIndeterminate></LinearIndeterminate>
        </div>
    )

    return(
        <Card style={{ minWidth: 600, maxWidth:800 ,backgroundColor:'#D3D3D3',padding:'5px',margin:'auto',height:300}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={course.imageLink}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {course.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Price:{course.price}
            </Typography>
            <Typography variant="body2" style={{ color: 'text.secondary'}}>
              {course.description}
            </Typography>
           
          </CardContent>
        </CardActionArea>
      </Card>
      ) 
}

//component for updating course form
function Updatecourse(props)
{
    const[title,setTitle]=React.useState("")
    const[description,setDescription]=React.useState("")
    const[price,setPrice]=React.useState("")
    const[imageLink,setImageLink]=React.useState("")

    //here only need to update course, no need to subscribe to atom
    const setCourse=useSetRecoilState(courseState);


  return(
    <>
       <Card style={{marginTop:'20px',backgroundColor:'#eeeeee',minWidth: 600, maxWidth:800,margin:'auto'}}>
       <Typography variant="h5" style={{textAlign:'center'}}>
           UPDATE COURSE
        </Typography>
       <div style={{
          display:'flex',flexDirection:'column',
          padding:'40px'
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
         fetch('https://coursemaster-c156.onrender.com/admin/course/'+props.id,{
            method:'PUT',
            headers:{'Authorization':'Bearer'+' '+localStorage.getItem('token'),
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,description,price,imageLink,published:true
            })
         }).then((res)=>{

               if(res)
               {
                let newCourse={};
                newCourse.title=title;
                newCourse.description=description;
                newCourse.price=price;
                newCourse.imageLink=imageLink;
                setCourse(newCourse);
               }

               else
               alert('course not updated!');
               
             
         })
       }}>Update Course</Button>
       </div>
       </Card>       
    </>
  )
}


export default Course;


const courseState = atom({
  key: 'courseState', 
  default: ''
});