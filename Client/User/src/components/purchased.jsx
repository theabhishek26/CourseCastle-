import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// const server='http://localhost:3000';
const server='https://coursemaster-c156.onrender.com';


function PurchasedCourses(){

      let[courses,setCourses]=useState([])
    //[] is necessary to declare empty array without this the map function return undefined

    //getting courses array from backend and setting it to state variable courses

    useEffect(()=>{
        fetch(server+'/user/purchasedCourses',{
            method:'GET',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>
            {
                setCourses(data.purchased)
                console.log(courses);
            })
        }).catch((err)=>{
          console.log('error in courses',err);
        })
    },[])
    

    if(!courses)
    {
      return(
        <div className="text-center h-[100vh] w-1/2 mx-auto flex items-center justify-center">
        <Typography  className="text-porange text-3xl font-bold font-afacad">
              No courses Added
            </Typography>
        </div>
      )
    }

return(
  <div className='flex flex-col p-4 overflow-scroll h-[100vh] no-scrollbar'>

  <div className="top flex md:flex-row flex-col justify-between gap-4 mb-6 ">
  <Typography className="text-center md:text-4xl text-3xl font-semibold font-afacad">Purchased Courses</Typography>
  
  {/* search box */}
  <div className="lg:w-lg md:w-md">
  <div className="relative">
    <input
      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 lg:text-lg border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      placeholder="Search Courses" 
    />
    <button
      class="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center lg:text-lg text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
      </svg>
 
      Search
    </button> 
  </div>
  </div>
</div>

{/* content */}
  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
  {
    courses.map((course)=>{
      return(
        <CourseCard course={course}></CourseCard>
      )
    })
  }
  </div>
  </div>
)
}

function CourseCard({course}){
  const navigate=useNavigate();

  return(
    <div className='courseCard border-2  p-2 rounded-xl bg-gradient-to-b from-orange-100 via-25% via-orange-200 to-80% mb-4 hover:bg-gradient-to-t'>

        <Card className="mt-2  flex flex-col gap-4">
      <CardHeader color="blue-gray" className="h-48 flex items-center justify-center">
        <img
          src={course.imageLink}
          alt="card-image" className="w-[95%] rounded-md"
        />
      </CardHeader>

      <CardBody className="px-3 flex flex-col gap-3">
        <Typography className="mb-2 text-black text-2xl font-semibold h-10 overflow-scroll no-scrollbar">
          {course.title}
        </Typography>
        <Typography className="text-lg h-24 overflow-scroll no-scrollbar">
         {course.description}
        </Typography>
      </CardBody>
       
      <div className="btns px-2 gap-2">   
         <button className='course-card-btns bg-green-600 ' onClick={()=>{
          navigate('/course/'+course._id)
         }}><span class="relative z-10 flex items-center gap-1 md:text-lg text-md " >VIEW</span></button>
      </div>
    </Card>
    </div>
  )
}

export default PurchasedCourses;