import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import Signup from './components/signup'
import Signin from './components/signin'
import Appbar from './components/Appbar'
import Addcourse from './components/Addcourse'
import Courses from './components/courses'
import Course from './components/course';
import Banner from './components/banner';
import {RecoilRoot} from 'recoil';
import DashBoard from './components/Dashboard';
import { useEffect, useState } from 'react';


function App() {
  const [navOpen,setNavopen]=useState(false);
  
  // const[location,setLocation]=useState(null);
  // useEffect(()=>{
  //   setLocation(window.location.pathname);
  // },[window])
  // console.log(location)
  //TO BE SOLVED

  return (
    //flex display as on navopen , components come below navbar hence made it flex
    //for this we passed navOpen from here as prop
    <div className={(navOpen?'flex':'block')}>     
      {/* <RecoilRoot> */}
      <Router>
        
        {/* to be SOLVED */}
        {/* {(location!='/signin' && location!='/signup')&&<Appbar navOpen={navOpen} setNavopen={setNavopen}/>} */}

        {/* appbar placed here to use usenavigate in it */}
        <Appbar navOpen={navOpen} setNavopen={setNavopen}/>
        <Routes>
          <Route path='/' element={<Banner/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/addcourse' element={<Addcourse/>}/>
          <Route path='/courses' element={<Courses/>}/>        
          <Route path='/course/:courseId' element={<Course/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Routes>
      </Router>
      {/* </RecoilRoot> */}
    </div>
  )
}

export default App
