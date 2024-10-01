const express=require('express');
const jwt=require('jsonwebtoken');
const{authenticateJwt,jwtPass}=require('../middleware/authentication');  //object destructuring
const {user,admin,course}=require('../DB/db');

const router=express.Router();

// Admin routes

//route to be called for rendering logged in react
//*************/
router.get('/me',authenticateJwt,(req,res)=>{
    let username=req.user.username;
    res.json({username});
  })
  
  //creates new admin account
  router.post('/signup',(req, res) => {
  
      //The destructuring assignment will extract username and password from this object and assign them to the input_username and input_password variables.
    // const{input_username,input_password}=req.body;
    const input_username=req.body.username;
    const input_password=req.body.password;
    admin.findOne({username:input_username}).then(callback);
    
    function callback(Admin){
      console.log(Admin)
      if(Admin)
      res.json({message:"Admin already exist"});
  
      else{
          const obj={username:input_username,password:input_password};
    
          const newAdmin=new admin(obj);
  
          newAdmin.save().then(()=>
         {
           //assigning jwt tokens
           const token=jwt.sign({username:input_username,role:'admin'},jwtPass,{expiresIn:'60m'});
           res.json({message:'Admin Created Succesfully',token});
         })
      }
    }
    
  });
  
  
  // Authenticates an admin. It requires the admin to send username and password in the headers.
  router.post('/login',async (req, res) => {
  
    const input_username=req.headers.username;
    const input_password=req.headers.password;
    //authenticate admin
    let check_admin=await admin.findOne({username:input_username,password:input_password});
  
    if(check_admin)
    {
       //assigning jwt tokens
       const token=jwt.sign({username:input_username,role:'admin'},jwtPass,{expiresIn:'60m'});
       res.json({message:'Loggged in Succesfully',token});
    }
  
    else
    res.json({message:"Invalid login credentials"});
  });
  
  
  //Creates a new course.
  router.post('/courses',authenticateJwt, (req, res) => {
    
    const newCourse=new course(req.body);
    newCourse.save().then(()=> res.json({message:'Course created Succesfully',courseId:newCourse.id}));
  });
  
  
  
  // Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited.
  router.put('/courses/:courseId',authenticateJwt,(req, res) => {
         
       let input_courseId=req.params.courseId;       
       const updated_course_details=req.body;
      
      //updating course, sending error if not done
      course.findByIdAndUpdate(input_courseId,updated_course_details).then((result)=>
        {
          if(!result)
            res.send('course not found');
  
          else
          res.send("course updated succesfully")
        }).catch(err=> res.send(err))
  });
  


  ////////////////////////////////////////////////////////////////
  // logic to get all courses
  router.get('/courses',authenticateJwt,async (req, res) => {
     
     //get array of all courses
     const all_courses=await course.find({});
  
     if(all_courses.length==0)
      res.json({message:'courses list empty'});
  
     else
     res.json({all_courses});
  });
  
  //to get course with given id
  router.get('/course/:courseId',authenticateJwt,(req,res)=>{
  
    let input_courseId=req.params.courseId;
    course.findById(input_courseId).then((result)=>{
      res.json({course:result});
    })
  })

    //logic to delete a course by given id
    router.delete('/course/:courseId',authenticateJwt,async (req, res) => {
         
      let input_courseId=req.params.courseId;       
      
      try {
        const result = await course.findByIdAndDelete(input_courseId);
        if (result) {
          res.json({message:result});
        } else {
          res.json({message:'No document found with that ID'});
        }
      } catch (err) {
        console.error({message:'Error deleting document:'+err});
      }
  });
  
  module.exports=router