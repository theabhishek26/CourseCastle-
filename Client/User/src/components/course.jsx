//update code using recoil

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

       <div className='grid grid-cols-3 h-[90vh]'>

       <div className="left flex flex-col gap-4  p-2 col-span-2 text-xl">
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

       <div className="right border-2 border-yellow-500 flex flex-col items-center overflow-scroll no-scrollbar p-4">
          <div className="title text-2xl font-bold mb-2">
            {course.title}
          </div>

        
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
    <div className='flex justify-between gap-4 w-[450px] px-4 py-3 rounded-lg bg-orange-200 hover:scale-105 cursor-pointer' onClick={()=>{
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


function ShowCommentsComp({comment}){
    return(
      <div className='flex flex-col'>
        <p className='font-semibold'>{comment.commentUsername}</p>
        <p>{comment.commentBody}</p>
      </div>
    )
  }

export default Course





