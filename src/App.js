
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import HomeBoard from './pages/HomeBoard';
import LoginPage from "./pages/LoginPage";


import RegisterSelect from './components/RegisterSelect';
import RegisterTeacher from './pages/RegisterTeacher';
import UserMenu from './components/UserMenu';
import CourseCreatorForm from './components/teacherUserInterfaces/CourseCreatorForm';

function App() {
  return (
   
    <div>
      <div className="row">
        <Link className='col-2' to="/">
          <img className='main_logo' src="./Remote_logo.png" alt="page logo"></img>
        </Link>
        <div className='col-6'>SearchBar</div>
        <div className='col-1'>Cart</div>
        <div className='col-3'>
        <UserMenu className="text-center"/>
        <Link to="/login" className='text-center'>Login</Link>
        
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomeBoard/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterSelect/>}></Route>
        <Route path="/create-new-course" element={<CourseCreatorForm/>}></Route>
        <Route path="/register-teacher" element={<RegisterTeacher/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
