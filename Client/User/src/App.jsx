import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './components/signup';
import Navbar from './components/navbar';
import Signin from './components/signin';
import Courses from './components/courses';
import BuyCourse from './components/buyCourse'
import PurchasedCourses from './components/purchased';
import Course from './components/course'
import { useState } from 'react';

function App()
{
  const [navOpen,setNavopen]=useState(false);

  return(

    <div className={(navOpen?'flex':'block')}>     
      <Router>  
      <Navbar navOpen={navOpen} setNavopen={setNavopen}/>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/courses' element={<Courses/>}/>        
        <Route path='/buyCourse/:courseId' element={<BuyCourse/>}/>
        <Route path='/course/:courseId' element={<Course/>}/>
        <Route path='/courses/purchased' element={<PurchasedCourses/>}/>
        {/* <Route path='/dashboard' element={<DashBoard/>}/> */}
      </Routes>
    </Router>
  </div>

    // <RecoilRoot>
    //   <Router>
    //     <Navbar></Navbar>
    //   <Routes>
    //   <Route path='/' element={<Signin/>}/>
    //   <Route path='/signup' element={<Signup/>}/>
    //   <Route path='/signin' element={<Signin/>}/>
    //   <Route path='/courses' element={<Allcourses/>}/>
    //   <Route path='/course/:courseId' element={<Course/>}/>
    //   <Route path='/courses/purchased' element={<PurchasedCourses/>}/>
    //   </Routes>
    //   </Router>
    // </RecoilRoot>
  )
}

export default App;