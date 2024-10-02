import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './components/signup'
import Signin from './components/signin'
import Appbar from './components/Appbar'
import Addcourse from './components/Addcourse'
import Courses from './components/courses'
import Course from './components/course';
import Banner from './components/banner';
import {RecoilRoot} from 'recoil';

function App() {
  return (
    <>
      
      <RecoilRoot>
      <Router>
        {/* appbar placed here to use usenavigate in it */}
        <Appbar/>
        <Routes>
          <Route path='/' element={<Banner/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/addcourse' element={<Addcourse/>}/>
          <Route path='/courses' element={<Courses/>}/>        
          <Route path='/course/:courseId' element={<Course/>}/>        
        </Routes>
      </Router>
      </RecoilRoot>
    </>
  )
}

export default App
