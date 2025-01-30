# COURSEMASTER-course selling site

COURSEMASTER is a comprehensive, full-stack course management platform built with the MERN stack, designed to connect educators and learners. Admins can easily create and manage video courses, set pricing, and upload educational content, while users can browse, purchase, and access courses with a streamlined, intuitive interface. The platform features a secure, JWT-based authentication system to keep user and admin access separate and safe. With responsive design, COURSEMASTER offers seamless navigation across devices, making it a practical tool for both educational institutions and individual creators looking to share their expertise.

Live Link : https://coursemaster-admin.vercel.app/

## Table of Contents
- [COURSEMASTER-course selling site](#coursemaster-course-selling-site)
  - [Table of Contents](#table-of-contents)
  - [Project Demo](#project-demo)
  - [Features](#features)
  - [Building Process](#building-process)
    - [Step 1: Initial Setup](#step-1-initial-setup)
    - [Step 2: Backend Development](#step-2-backend-development)
      - [Basic Structure of Backend Code](#basic-structure-of-backend-code)
      - [Admin Routes](#admin-routes)
        - [storing videos in folder using MULTER](#storing-videos-in-folder-using-multer)
      - [User Routes](#user-routes)
      - [Authentication using JWT](#authentication-using-jwt)
    - [Step 3: Frontend Development](#step-3-frontend-development)
      - [Basic structure of frontend](#basic-structure-of-frontend)
      - [Admin-frontend](#admin-frontend)
        - [App.jsx file](#appjsx-file)
        - [index.css file](#indexcss-file)
        - [Components](#components)
        - [courses.jsx](#coursesjsx)
        - [addcourse.jsx](#addcoursejsx)
        - [course.jsx](#coursejsx)
      - [User-frontend](#user-frontend)
        - [buyCourse.jsx](#buycoursejsx)
        - [purchased.jsx](#purchasedjsx)
        - [courses.jsx](#coursesjsx-1)
        - [course.jsx](#coursejsx-1)
    - [Step 4: Integration](#step-4-integration)
    - [Step 5: Testing and Debugging](#step-5-testing-and-debugging)
  - [Learnings](#learnings)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Technologies Used](#technologies-used)
  - [Conclusion](#conclusion)


## Project Demo

Live demo: [Project Demo](https://coursemaster-admin.vercel.app/) 

## Features
- Seperate User and Admin Section
- Admin/User authentication (Sign up, Login, Logout)
- Admin-Side:Course creation,deletion,uploading video
- User-Side:Course buying,playing videos,comments,purchased courses
- Responsive design for all screen sizes

## Building Process

### Step 1: Initial Setup
- Created Root folder Course-Selling-App
- Inside it created Client and Server Subfolders
- Inside Client Created Admin and User Subfolders
- Installed all required libraries and dependencies
- Setup Postman Collection for testing backend routes-**CourseMaster.postman_collection.json** file
- Created MongoDB database and saved its URL in **.env** file
  
### Step 2: Backend Development

#### Basic Structure of Backend Code
- Created **index.js** as main server file
- In **index.js**
   - connected to mongo DB
   - setup middlewares like body-parser,CORS
   - Navigation to **user** and **admin** backend routes
- **db.js** file for creating DB schemas and collections
-  **authentication.js** for JWT authentication, to be used as middleware, verifies JWT token for authentication
-  **admin.js** and **user.js** for admin and user side backend routes
  
  #### Admin Routes
  - '/me' : returns the username of logged in admin(uses **req.user** to get username)
  - '/signup': takes username and password as JSON body and created new admin in DB, also ensures to not create duplicate admin
    - signs username with JWT secret key and sends JWT token as response:
   ```bash 
    const token=jwt.sign({username:input_username,role:'admin'},jwtPass,{expiresIn:'60m'});
    res.json({message:'Loggged in Succesfully',token})
   ```
  
  - '/login' : takes username and password as headers and generate JWT token, if credentials match in DB
     - The JWT token will be used for further authentication
  
  - POST '/courses' : creates new course using request Body in JSON format
       - also saves admin name who created the course
 -  GET '/courses' : get all courses created by logged in admin (uses **req.user** for getting logged in admin)
 -  GET '/course/:courseId' : get course with courseID given through query Params(/:courseId)
    ```bash
    let input_courseId=req.params.courseId;
    ```
  - DELETE '/course/:courseId': Deletes course with given ID
      - Here we also need to maintain DB consistency, so we have to delete the course reference in all **users** purchased courses:
      ```bash
       await user.updateMany(
            {}, 
            { $pull: {purchased_courses:input_courseId}} 
          )
      ```

   - POST '/comment': Receive commentBody and comment CourseID from form-data and save comment related to a course in DB, also store name of user/admin posting the comment
     
   - GET '/comment': Get all comments

   - POST '/video/upload': Takes video title,description and file in form-data
        - saves video file to *videos* folder
          ```bash
          upload.single('uploaded_video')
          ```
        - stores video information in Database
          ```bash
          const uploadedVideo=new video(videoObj)
          await uploadedVideo.save()
          ``` 

   - GET '/videos': Get all videos from the database

   - USE '/videos' middleware: Once '/videos' route gets called, it servers all files in *videos* folder
        - a particular video can be played by route '/videos/VideoFilename' in browser (videoFilename is name of video file as stored in folder)  
    ```bash
    router.use('/videos',express.static(path.join(__dirname,'videos')))
      console.log(path.join(__dirname,'videos'))
    ```
  - **path.join(__dirname,'videos')** used to ensure compatibility of path across different OS
     
   ##### storing videos in folder using MULTER
   - defined multer storage to upload videos to folder
   ```bash
     const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'videos'))
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniquePrefix+'-'+file.originalname)
   }
   })

   const upload = multer({ storage: storage })
   ``` 

#### User Routes
- signup,login,me,courses routes same as Admin routes
- POST '/courses/:courseId': Purchase course with given courseID
   - also checks if no course with given courseId is found
   - get data of course to be purchased from DB
   ```bash
   const course_to_be_purchased = await course.findById(input_courseId);
   ``` 
   - get data of user purchasing course from DB
   ```bash
   const user_detail = await user.findOne({ username: req.user.username });
   ``` 
   - push the fetched course object to purchased course array of that user
   ```bash
   user_detail.purchased_courses.push(course_to_be_purchased);
        await user_detail.save();
   ``` 
- GET '/purchasedCourses': get all courses purchased by logged in user
  - get user purchased courses array(contains reference to purchased courses)
  ```bash
  const purchased=user_detail.purchased_courses;
  ``` 
  - use for-of loop on purchased array to get full details of courses whose ids are referenced
  ```bash
  for(let id of purchased){
            let c=await course.findById(id.toString());
            purchasedCourses.push(c);
          }
          res.json({purchased:purchasedCourses});  
   ``` 

   #### Authentication using JWT
   - assigning jwt token
   ```bash 
   const token=jwt.sign({username,role:'user'},jwtPass)
   ```
   - verifying jwt token
   ```bash
   const input_token=authHeader.split(' ')[1];
   jwt.verify(input_token,jwtPass,(err,decoded)=>
   {
      if(err)
      return res.status(403).send('token authorization failed');
      req.user=decoded;
      next();
   });
   ``` 


### Step 3: Frontend Development
#### Basic structure of frontend
- The frontend consists of two folders- **Admin** and **Client** consisting of Admin and Client side frontend code respectively. Frontend is designed in **ReactJS and TailwindCSS**
- In both folders the src subfolder contains- assets,components,App.jsx(main React file),index.css(for styling)


#### Admin-frontend

##### App.jsx file
- Imported all the required components from **components** folder
- Added different routes in React-Router to render components based on its route
- **Appbar** component is rendered on all routes 
- **Navopen** prop is passed to set Navbar on top/side

##### index.css file
- It includes tailwind configurations
- Class to hide scrollBar
```
/* Hide scrollbar for Chrome, Safari, and Edge */
.no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  .no-scrollbar {
    scrollbar-width: none; /* Firefox */
  }
``` 
- other class based styling to use global styling

##### Components

- **Banner.jsx**
   - It is start page of frontend UI with buttons to visit Admin(educators) and Users(students) section
- **Appbar.jsx**
   - fetching username from backend and render Appbar only when **username** state variable is populated 
   - Navbar is either open(at side)-contains options for Viewing all courses,add course and logout options or closed(at top)-contains toggle button to open sideNav
   - Based on **navopen** prop different component is returned
   - If side navopen then we used **flex-col**
   - If top navopen then we made it **sticky** to be at top
  
- **signin.jsx/signup.jsx**
  - take email and password input,send it to backend login/signup route and save the token received to **localStorage**
  ```bash
  if(data.token)
  localStorage.setItem('token',data.token);
  ``` 
  - **message** state variable for displaying quick message after login
  - **loader** state variable for showing loader till fetching from backend

  ##### courses.jsx
  - This components shows all the courses created by logged in Admin
  - fetched all courses from backend and saved them to **courses** variable
  - Each course card has buttons to **view** and **delete** course

  ##### addcourse.jsx
  - This route contains a form to fill title,description,imageLink and price of a new course and add it.
  - convert input to JSON format before sending to backend
  ```bash
  body:JSON.stringify({
  title,description,price,imageLink,published:true})
  ``` 

  ##### course.jsx
  - This component shows course details,all videos in that course,comments,videoPlayer and addVideo option for a course
  - get current courseID(to fetch a course detail) **using params** as the route called is **'/course/:courseId'**
  - fetched all videos and stored in videos state variable
  - filter videos array for storing only videos related to the courseID
  -  play clicked video by fetching it from middleware
  ```bash
  <div className="player flex justify-center h-96">
  <video className='w-full h-full' src={server+`/admin/videos/${currVideoPath}`} poster={course.imageLink} controls autoPlay></video>
  </div>
  ```  
  - upload video by filling form and using formdata for sending to backend
  ```bash
  const formdata =new FormData()
    formdata.append('title',title)
    formdata.append('description',description)
    formdata.append('videoCourseId',videoCourseId)
    formdata.append('uploaded_video',uploadedVideo)
  ``` 
  - displaying upload form conditionally
  ```
  /* //display upload form conditionally */

  {showForm && <UploadFormComp toggleForm={toggleForm} courseId={courseId} setLoader={setLoader}/>}
  ``` 
  -  if we use **FormData()** then the **content-type:multipart/form-data** will be sent, only use if form contains files(video,etc.) as input,
  - for normal forms not containing any file- we use const **formdata=new URLSearchParams()**  **'Content-Type':'application/x-www-form-urlencoded'** will be sent
 
  - **Videoinfo** component to display information related to video
  - **showcomment** component to display comments related to current course fetched from backend
  - The layout is designed using css-grid


#### User-frontend
- this is UI visible to students
- It contains options to
   - view all courses(from all admins)
   - view courses purchased by user
   - purchase any course
   - let student access purchased courses
-  Routes/components different than admin are-purchased.jsx,buyCourse.jsx
##### buyCourse.jsx
- shows details of a selected course and option to buy the course
- on clicking buy button the 'purchase' route of backend is called
##### purchased.jsx
- displays all the courses purchased by student
##### courses.jsx
- displays all courses from all admins
##### course.jsx
- only add video option is not available, rest same as admin side course.jsx component    

### Step 4: Integration
- Connected backend and frontend using fetch API calls from frontend on desired backend routes
- ensuring the data sent in POST requests are in proper format (json,formdata,etc.)


### Step 5: Testing and Debugging
- Testing Backend routes using postman
- The postman-collection is stored in **CourseMaster.postman_collection.json**

## Learnings
Through this project, I gained a comprehensive understanding of full-stack development using the MERN stack. Key learnings included:

- **MERN Stack Integration**: Developed proficiency in integrating MongoDB, Express, React, and Node.js to create a cohesive full-stack application. 
- **Authentication and Authorization**: Implemented JWT-based authentication to create separate user and admin sections, providing restricted access to specific routes and actions.
- **File Management with Multer**: Learned how to store and manage video files on the server disk using Multer, making them accessible through frontend routes.
- **MongoDB(mongoose) Data Management**: Enhanced my skills in managing data within MongoDB, particularly in creating relationships between documents and ensuring data consistency when updating and deleting entries.
- **Frontend State Management**: Used React's state management to handle and display user and admin-specific information dynamically.
- **Routing and Middleware Usage**: Applied Express middlewares to handle video serving and JWT verification effectively, maintaining secure data flow across the backend.
- **UI Design with Tailwind CSS**: Leveraged Tailwind for responsive design, creating a user-friendly interface that adapts well to different screen sizes.
- **Debugging and Testing**: Used Postman to test and debug backend routes and used JSON data formats and form data (FormData) to correctly format requests, particularly when handling files.

This project strengthened my understanding of MERN stack applications and helped refine my problem-solving skills, particularly around complex data and media handling.

## Installation

### Prerequisites
- Node.js
- MongoDB
- Git
- Express.js
- React.js
- Postman
- Multer

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/username/projectname.git
   ```
2. Navigate to the project folder:
   ```bash
   cd projectname
   ```
3. Install server and client dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```
4. Configure environment variables in a `.env` file in the root:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. Start the application:
   ```bash
   npm run dev
   ```
6. Access the app at `http://localhost:3000` (backend) and `http://localhost:5000` (frontend).


## Technologies Used
- **Frontend**: React,Tailwind,MaterialUI
- **Backend**: Node.js, Express, Multer
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Conclusion

COURSEMASTER has been a valuable project that enhanced my understanding of building a full-stack application with the MERN stack. Through implementing complex features like JWT-based authentication, file handling with Multer, and responsive UI with React and Tailwind, I gained practical insights into creating a seamless user experience. I look forward to applying these learnings to future projects,improve this project with new technologies and welcome any feedback or contributions to improve this application further. Thank you for checking out COURSEMASTER!
