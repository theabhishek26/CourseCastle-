const express=require('express');
const jwt=require('jsonwebtoken');
const {authenticateJwt,jwtPass}=require('../middleware/authentication');
const {user,admin,course}=require('../DB/db');

const router=express.Router();


// User routes

router.post('/signup',async (req, res) => {
    // logic to sign up user
  
    //taking input from body to create user account
    const {username,password}=req.body;
    
  
    //check if user already exists
    const existing_user=await user.findOne({username});
   
    if(existing_user)
      res.json({message:'user already exist'})
  
    else
    {
      const obj={username,password}
  
      const newUser=new user(obj);
      newUser.save().then(()=>
        {
          //assigning jwt token
          const token=jwt.sign({username,role:'user'},jwtPass)
          res.json({message:'user account created',token:token})
        })
    } 
  });
  
  
  
  router.post('/login',async (req, res) => {
    // logic to log in user
  
    const { username, password} = req.headers;
    //authenticate user
    const get_user=await user.findOne({username,password});
  
    if(get_user)
    {
      //generating token
      const token=jwt.sign({username,role:'user'},jwtPass)
      res.send({message:'logged in succesfully',token:token})
    }
    else
    res.send({message:"invalid login credentials"});
  });
  
  //route for getting email if logged in
  router.get('/me',authenticateJwt,(req,res)=>{
      let username=req.user.username;
      res.json({username});
  })
  
  
  router.get('/courses',authenticateJwt,async (req, res) => {
    // logic to list all courses
     const all_courses=await course.find({});
     if(all_courses.length==0)
      res.json({message:'no courses available'});
  
     else
     res.json({all_courses});   
  });
  
  //get course by given id
  router.get('/course/:courseId',authenticateJwt,(req,res)=>{
  
    let input_courseId=req.params.courseId;
    course.findById(input_courseId).then((result)=>{
      res.json({course:result});
    })
  })

  //purchase course
  router.post('/courses/:courseId',authenticateJwt, async(req, res) => {
    
        const input_courseId=req.params.courseId;
        // Getting course
        const course_to_be_purchased = await course.findById(input_courseId);
  
        if (!course_to_be_purchased) {
          return res.status(404).send('Course not found');
        }
        
        //else
        const user_detail = await user.findOne({ username: req.user.username });  //got username by jwt
  
        if (!user_detail) {
          return res.status(404).send('User not found');
        }
        
        console.log(user_detail);
  
      //TODO: avoid purchase of course if already purchased
        // if(user_detail.purchased_courses.some(ele=>ele===input_courseId))
        //   return res.send('course already purchased');
  
        user_detail.purchased_courses.push(course_to_be_purchased);
        await user_detail.save();
        res.send('course purchased succesfully');
      });
  
  
  router.get('/purchasedCourses',authenticateJwt,async(req, res) => {
     // logic to view purchased courses
     
   //getting user purchased courses
   const user_detail=await user.findOne({username:req.user.username});
  
   if(user_detail)
   {
      const purchased=user_detail.purchased_courses;
      if(purchased.length==0)
       res.send({message:'no purchased courses'});
     
      else 
      {
        let purchasedCourses=[];

        if(purchased.length==0)
          res.json({message:'no course purchased'});

        else{
          //async await important here. Think why?

          // The forEach method doesn't handle asynchronous operations properly because it doesn't wait for the promises returned by async functions to resolve so use for..of loop

          //on using forEach 1.prints output but 2.prints empty array

          for(let id of purchased){
            let c=await course.findById(id.toString());
            purchasedCourses.push(c);
            // console.log("1."+purchasedCourses);
          }
          // console.log("2."+purchasedCourses);
          res.json({purchased:purchasedCourses});  
        }
        }      
   }
   else
   {
      res.status(403).send('user not found');
   }
    
  });

  module.exports=router