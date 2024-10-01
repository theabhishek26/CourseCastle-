import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

function Courses()
{
    let[courses,setCourses]=React.useState([])
    //[] is necessary to declare empty array without this the map function return undefined

    //getting courses array from backend and setting it to state variable courses

    useEffect(()=>{
        fetch('https://coursemaster-c156.onrender.com/admin/courses',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>
            {
                setCourses(data.all_courses)
                console.log(courses);
            })
        }).catch((err)=>{
          console.log('error in courses',err);
        })
    },[])
    
    if(!courses)
    {
      return(
        <>
        <h1 style={{textAlign:'center'}}>COURSES</h1>
        <Typography variant='h6' style={{ color: 'text.secondary',textAlign:'center'}}>
              No courses Added
            </Typography>
        </>
      )
    }

    return(
        <>
        <h1 style={{textAlign:'center'}}>COURSES</h1>
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
    {
        courses.map((course)=>{
        return (<Coursecomp course={course}></Coursecomp>)
        })
    }
    </div>
    </>
    )
}

function Coursecomp(props)
{
    return(
        <Card style={{ minWidth: 350, maxWidth:400 ,backgroundColor:'#D3D3D3',margin:'5px',padding:'5px'}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.course.imageLink}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {props.course.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Price:{props.course.price}
            </Typography>
            <Typography variant="body2" style={{ color: 'text.secondary'}}>
              {props.course.description}
            </Typography>
            <div style={{display:'flex',gap:'15px'}}>
            <Button variant="outlined" onClick={()=>{
              window.location='/course/'+props.course._id
            }}>VIEW</Button>


            <Button variant="contained" onClick={()=>{
              fetch('https://coursemaster-c156.onrender.com/admin/course/'+props.course._id,{
                method:'DELETE',
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem('token')
                } 
               }).then((res)=>
               {
                if(res)
                  window.location='/courses/'
                alert('course deleted')
               }
                   )
           
            }}>DELETE</Button>


            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      ) 
}

export default Courses;