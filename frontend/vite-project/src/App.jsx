import { Routes, Route } from "react-router";
import Homepage from './Pages/homepage';
import Login from "./Pages/login";
import Signup from './pages/signup'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import CreateProblemPage from "./Pages/createProblemPage";
import AdminPanel from "./Pages/adminPanel";
import GetProblem from "./Pages/getProblem";
import Deleteproblem from "./component/deleteproblem";
import UpdateProblemPage from "./component/updateProblemPage";
import UpdateProblem from "./component/updateProblemById";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [])



  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />}></Route>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />}></Route>

        <Route path="/admin" element={
          isAuthenticated === true && user.role === 'admin' ?
            <AdminPanel />
            : <Navigate to="/" />
        }>

        </Route>
        <Route path="/admin/createproblem" element={
          isAuthenticated === true && user.role === 'admin' ?
            <CreateProblemPage /> : <Navigate to="/" />}>
        </Route>

        <Route path="/getproblem/:problemId" element={
          isAuthenticated && user.role === 'admin' ?
           <GetProblem /> :
           <Navigate to='/'/>}>
          </Route>

        <Route path="/admin/deleteproblem" element={
          isAuthenticated && user.role === 'admin' ?
           <Deleteproblem/> : 
           <Navigate to="/"/>}>
           </Route>

        <Route path="/admin/updateproblem" element={<UpdateProblemPage/>}></Route>
        <Route path="/admin/updateproblem/:id" element={<UpdateProblem/>}></Route>
      </Routes>

    </>
  )
}

export default App;