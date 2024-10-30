import React from 'react'
import { useNavigate } from 'react-router-dom';

// const server='http://localhost:3000';
const server='https://coursemaster-c156.onrender.com';

function Addcourse()
{
    const[title,setTitle]=React.useState()
    const[description,setDescription]=React.useState()
    const[price,setPrice]=React.useState()
    const[imageLink,setImageLink]=React.useState()
    const navigate=useNavigate();

    return(
      <div className='font-afacad border-2 flex flex-col items-center gap-10 lg:w-1/2 lg:mx-auto lg:h-[90vh] md:[h-70vh] justify-center lg:mt-2 mt-16 py-10 mx-5 bg-orange-200 rounded-lg'>
         <h1 className='text-4xl font-bold'>Add a Course</h1>

         <div className="form flex flex-col gap-6">
         <input type="text" className='input' placeholder='Enter Course title' onChange={(e)=>{
          setTitle(e.target.value)
         }}/>
         <input type="text" className='input' placeholder='Enter Course Description' onChange={(e)=>{
          setDescription(e.target.value);
         }} />
         <input type="text" className='input' placeholder='Put Image Link' onChange={(e)=>{
          setImageLink(e.target.value)
         }}/>
          <input type="text" className='input' placeholder='Course Price' onChange={(e)=>{
            setPrice(e.target.value)
          }} />

         </div>

         <button class="relative flex md:h-12 md:w-96 w-36 h-10 items-center justify-center overflow-hidden  text-white transition-all bg-black before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white hover:text-black hover:font-bold before:duration-500 before:ease-out hover:before:h-56 hover:before:w-[600px] active:scale-95" onClick={()=>{
                           fetch(server+'/admin/courses',{
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
               navigate('/courses');
               alert('course added')
            }
         })
       }}>
        <span class="relative z-10 flex items-center gap-1 md:text-2xl text-lg">Add Course</span>
        </button>

      </div>
    )
}

export default Addcourse;