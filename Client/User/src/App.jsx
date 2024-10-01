import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import {RecoilRoot} from 'recoil';
import Signup from '../components/signup';
import Navbar from '../components/navbar';
import Signin from '../components/signin';
import Allcourses from '../components/courses';
import Course from '../components/course'
import PurchasedCourses from '../components/purcahsed';
function App()
{
  return(
    <RecoilRoot>
      <Router>
        <Navbar></Navbar>
      <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/courses' element={<Allcourses/>}/>
      <Route path='/course/:courseId' element={<Course/>}/>
      <Route path='/courses/purchased' element={<PurchasedCourses/>}/>
      </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App;