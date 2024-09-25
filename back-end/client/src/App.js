import './App.css';
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </>
  );
}

export const ProtectedRoutes = (props)=>{
  if(localStorage.getItem("user")){
    return props.children;
  }
  else{
    return <Navigate to={"/login"}/>
  }
}

export default App;
