
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import HomeBoard from './components/HomeBoard';
import LoginPage from './components/LoginPage';

import RegisterSelect from './components/RegisterSelect';
import RegisterTeacher from './components/RegisterTeacher';
import UserMenu from './components/UserMenu';
import { UserInfoCtxProvider } from './contexts/userInfoCtx';

function App() {
  return (
   
    <div>
      <div className="row">
        <div className='col-2'>
          <img className='main_logo' src="./Remote_logo.png" alt="page logo"></img>
        </div>
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
        <Route path="/register" element={<RegisterSelect/>}>
        </Route>
        <Route path="/register-teacher" element={<RegisterTeacher/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
