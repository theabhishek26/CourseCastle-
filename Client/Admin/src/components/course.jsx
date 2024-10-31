
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// const server=server+'';
const server='https://coursemaster-c156.onrender.com';

function Course(){
  
  const courseId=useParams().courseId;
  const [course,setCourse]=useState([])
  const [videos,setVideos]=useState([]);
  const [currTitle,setCurrTitle]=useState('Select a Video to Play')
  const [currDescription,setCurrDescription]=useState('Description of Video')
  const [comments,setComments]=useState([])
  const [postedComment,setPostedComment]=useState('')

  // will be used to play clicked video
  const [currVideoPath,setCurrVideoPath]=useState('')

  //for displaying form for video upload
  const [showForm,setShowForm]=useState(false);
  function toggleForm(){
      setShowForm(!showForm)
  }

    //for getting all videos
    useEffect(()=>{
      fetch(server+'/admin/videos',{
        headers:{Authorization:'Bearer '+localStorage.getItem('token')}
      }).then((res)=>res.json().then((data)=>{
        setVideos(data.videos);
      }))
   },[])  
   //for showing only videos of current course
   const courseVideos=videos.filter((element)=>element.videoCourseId===courseId)

   //for getting course info
   useEffect(()=>{
    fetch(server+'/admin/course/'+courseId,{
      headers:{Authorization:'Bearer '+localStorage.getItem('token')}
    }).then((res)=>res.json().then((data)=>setCourse(data.course))).catch((err)=>alert(err))
   },[])

   //for getting all comments
   useEffect(()=>{
     fetch(server+'/admin/comments',{
      headers:{Authorization:'Bearer '+localStorage.getItem('token')}
     }).then((res)=>res.json().then((data)=>setComments(data.comments))).catch((err)=>{
      alert('error'+err)
     })
   },[])
   //getting comments related to course
   const courseComments=comments.filter((comment)=>comment.commentCourseId===courseId)

  return(
    <div className='font-afacad h-full p-2 bg-slate-50'>

       <div className='grid md:grid-cols-3 h-[90vh]'>

       <div className="left flex flex-col gap-4  p-2 md:col-span-2 text-xl">
        <div className="player flex justify-center h-96">
          <video className='w-full h-full' src={server+`/admin/videos/${currVideoPath}`} poster={course.imageLink} controls autoPlay></video>
        </div>
        <div className="videoDetails">
          <p className='text-3xl font-semibold'>{currTitle}</p>
          <p className='h-14 overflow-scroll no-scrollbar'>{currDescription}
          </p>
        </div>

        <div className="comments text-xl flex flex-col gap-4 border-orange-200 border-t-2 h-44 overflow-scroll no-scrollbar">
          <span className='font-semibold text-2xl'>Comments</span> 

          <div className="addComment flex gap-4">
            <input type="text" placeholder='Write Your Comment' className='p-4' onChange={(e)=>setPostedComment(e.target.value)}/>
            <button className='border-orange-300 border-2 px-2 hover:bg-orange-300 hover:px-4' onClick={()=>{

              //  if you're using FormData() in the frontend, the enctype of the form submission automatically becomes multipart/form-data,so we cant use Formdata()here
              // const formdata=new FormData();

              // If you specifically need application/x-www-form-urlencoded, use URLSearchParams() instead
              const formdata=new URLSearchParams();
              formdata.append('commentBody',postedComment)
              formdata.append('commentCourseId',courseId)

              fetch(server+'/admin/comment',{
                method:'POST',
                headers:{
                  'Authorization':'Bearer '+localStorage.getItem('token'),
                  'Content-Type':'application/x-www-form-urlencoded'
                },
                body:formdata
              }).then((res)=>{
                if(res.ok)
                {
                  window.location.reload()
                }
                else
                alert('cannot post comment')
              }).catch((err)=>alert(err))
            }}>Send</button>
          </div>

          <div className="showComments flex flex-col gap-2">
             {
              courseComments.map((comment)=><ShowCommentsComp comment={comment}/>)
             }
          </div>
        </div>

       </div>

       <div className="right border-2 border-yellow-500 flex flex-col items-center md:overflow-scroll no-scrollbar p-4">
          <div className="title text-2xl font-bold mb-2">
            {course.title}
          </div>
          <div className="title text-xl mb-4 flex items-center border-2 rounded-xl border-orange-200 p-1 hover:scale-110 hover:bg-orange-300 cursor-pointer" onClick={()=>{
            toggleForm()
          }}>
            {showForm}
            Add Video<span class="material-symbols-outlined">add</span>
          </div>

          {/* //display upload form conditionally */}
          {showForm && <UploadFormComp toggleForm={toggleForm} courseId={courseId}/>}

            {/* //display message if no video in array conditionally */}
            <div className="videoList flex flex-col gap-2">
            {   (courseVideos.length==0)?(<div>No videos for Course</div>):
                (courseVideos.map((video)=>{
                    return (
                      <Videoinfo video={video} setCurrTitle={setCurrTitle} setCurrDescription={setCurrDescription} setCurrVideoPath={setCurrVideoPath}></Videoinfo>
                    )
                  }))
            }
          </div>
          
       </div>

       </div>

    </div>
  )
}


function Videoinfo({video,setCurrTitle,setCurrDescription,setCurrVideoPath}){
  return(
    <div className='flex justify-between gap-4 lg:w-[450px] w-[200px] px-4 py-3 rounded-lg bg-orange-200 hover:scale-105 cursor-pointer' onClick={()=>{
      setCurrTitle(video.title)
      setCurrDescription(video.description)

      // as mware used filename for display of videos
      setCurrVideoPath(video.fileName)
    }}>
      <p>{video.title}</p>
      <p>duration</p>
      <span class="material-symbols-outlined">play_arrow</span>
    </div>
  )
}

function UploadFormComp({toggleForm,courseId}){
  const [title,setTitle]=useState();
  const [description,setDescription]=useState();
  const[uploadedVideo,setUploadedVideo]=useState();
  const [videoCourseId]=useState(courseId);

  function handleUpload(){
    const formdata =new FormData()
    formdata.append('title',title)
    formdata.append('description',description)
    formdata.append('videoCourseId',videoCourseId)
    formdata.append('uploaded_video',uploadedVideo)
    console.log(formdata)
    fetch(server+'/admin/video/upload',{
      method:'POST',
      headers:{Authorization:'Bearer '+localStorage.getItem('token')},
      body:formdata
    }).then((res)=>res.json().then((data)=>{
      console.log(data)
      window.location.reload()
    }))
    .catch((err)=>alert('error in uploading'+err));
  }

  return(
    <div className='flex flex-col border-orange-300 border-2 items-center text-2xl p-4 gap-2 m-2 rounded-lg'>
      <input type="text" className='border-2 border-orange-300 p-1 text-center rounded-lg bg-zinc-100 w-full' placeholder='Enter Video Title' onChange={(e)=>setTitle(e.target.value)}/>
      <input type="text" className='border-2 border-orange-300 p-1 text-center rounded-lg bg-zinc-100 w-full' placeholder='Enter Video Descritpion' onChange={(e)=>setDescription(e.target.value)}/>
      <input type="file" className='border-2 border-orange-300 p-1 text-center rounded-lg bg-zinc-100 w-full' accept='video/*' onChange={(e)=>setUploadedVideo(e.target.files[0])}/>

      <button className='border-2 border-black p-2 rounded-xl hover:bg-green-500' onClick={()=>{
        handleUpload()
        toggleForm()
      }}>Upload</button>

      <button className='border-2 border-black p-2 rounded-xl hover:bg-red-400' onClick={()=>{
        toggleForm()
      }}>Close</button>
    </div>
  )
}


function ShowCommentsComp({comment}){
    return(
      <div className='flex flex-col'>
        <p className='font-semibold'>{comment.commentUsername}</p>
        <p>{comment.commentBody}</p>
      </div>
    )
  }

export default Course

//   atom,
//   useRecoilState,
//   useRecoilValue,
//   useSetRecoilState,
// } from 'recoil';


// function Course(){
//    let {courseId}=useParams();  //OR let courseId=useParams().courseId;
//    //to store course with given id
//   //  const[course,setCourse]=React.useState({});

//   //use recoil atom in place of state variable above
//   //only need to set course here, no need to subscribe to courses
//   // const setCourse=useSetRecoilState(courseState);
//   const [course,setCourse]=useState([]);

//    useEffect(()=>{
//     fetch(server+'/admin/course/'+courseId,{
//         method:'GET',
//         headers:{
//             'Authorization':'Bearer '+localStorage.getItem('token')
//         } 
//        }).then((res)=>res.json().then((data)=>
//         {
//            setCourse(data.course);
//         }));
//    },[])
   
  

//    return (
//     <>
//     <div style={{backgroundColor:'#EEEEEE',display:'flex',flexDirection:'column',gap:'10px'}}>
    
//     {/* <Coursecomp course={course}></Coursecomp>
//     <Updatecourse id={courseId} setCourse={setCourse}></Updatecourse> */}

//     {/* above code without recoil below with recoil */}

//     <Coursecomp course={course}></Coursecomp>
//     <Updatecourse id={courseId}></Updatecourse>
//     </div>
//     </>
//    )
// }


// //component for showing a course
// function Coursecomp()
// {
//     //without recoil we did it with 
//     //here no need to set courses just need to subscribe to coursestate atom
//     const course=useRecoilValue(courseState);

//     //loader
//     if(Object.keys(course).length==0)
//     return(
//         <div>
//             <LinearIndeterminate></LinearIndeterminate>
//         </div>
//     )

//     return(
//         <Card style={{ minWidth: 600, maxWidth:800 ,backgroundColor:'#D3D3D3',padding:'5px',margin:'auto',height:300}}>
//         <CardActionArea>
//           <CardMedia
//             component="img"
//             height="140"
//             image={course.imageLink}
//             alt="green iguana"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//              {course.title}
//             </Typography>
//             <Typography gutterBottom variant="h6" component="div">
//               Price:{course.price}
//             </Typography>
//             <Typography variant="body2" style={{ color: 'text.secondary'}}>
//               {course.description}
//             </Typography>
           
//           </CardContent>
//         </CardActionArea>
//       </Card>
//       ) 
// }

// //component for updating course form
// function Updatecourse(props)
// {
//     const[title,setTitle]=React.useState("")
//     const[description,setDescription]=React.useState("")
//     const[price,setPrice]=React.useState("")
//     const[imageLink,setImageLink]=React.useState("")

//     //here only need to update course, no need to subscribe to atom
//     const setCourse=useSetRecoilState(courseState);


//   return(
//     <>
//        <Card style={{marginTop:'20px',backgroundColor:'#eeeeee',minWidth: 600, maxWidth:800,margin:'auto'}}>
//        <Typography variant="h5" style={{textAlign:'center'}}>
//            UPDATE COURSE
//         </Typography>
//        <div style={{
//           display:'flex',flexDirection:'column',
//           padding:'40px'
//        }}>
//        <TextField onChange={(e)=>{
//           setTitle(e.target.value)
//        }} label="Title" variant="outlined" />

//        <TextField onChange={(e)=>{
//         setDescription(e.target.value)
//        }} label="Description" variant="outlined" />

//        <TextField onChange={(e)=>{
//         setPrice(e.target.value)
//        }}  label="Price" variant="outlined" />

//        <TextField onChange={(e)=>{
//         setImageLink(e.target.value)
//        }}  label="Image-Link" variant="outlined" />

//        <Button variant="contained" onClick={()=>{
//          fetch(server+'/admin/course/'+props.id,{
//             method:'PUT',
//             headers:{'Authorization':'Bearer'+' '+localStorage.getItem('token'),
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({
//                 title,description,price,imageLink,published:true
//             })
//          }).then((res)=>{

//                if(res)
//                {
//                 let newCourse={};
//                 newCourse.title=title;
//                 newCourse.description=description;
//                 newCourse.price=price;
//                 newCourse.imageLink=imageLink;
//                 setCourse(newCourse);
//                }

//                else
//                alert('course not updated!');
               
             
//          })
//        }}>Update Course</Button>
//        </div>
//        </Card>       
//     </>
//   )
// }


// export default Course;


// const courseState = atom({
//   key: 'courseState', 
//   default: ''
// });