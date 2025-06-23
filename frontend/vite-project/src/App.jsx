import { Routes, Route } from "react-router";
import Homepage from './pages/homepage';
import Login from "./Pages/login";
import Signup from './pages/signup'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [])



  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/login"/>}></Route>
        <Route path="/login" element={isAuthenticated? <Navigate to="/"/> :  <Login />}></Route>
        <Route path="/signup" element={isAuthenticated? <Navigate to="/"/> : <Signup />}></Route>
      </Routes>
    </>
  )
}

export default App;