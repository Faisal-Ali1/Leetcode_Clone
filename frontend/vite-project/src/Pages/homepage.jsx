import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { useDispatch } from "react-redux";
import logoutUser from '../authSlice';
import { useNavigate } from "react-router";


function Homepage() {

    const [problems, setProblems] = useState([]);
    const {user , isAuthenticated} = useSelector((state) => state.auth);

    console.log(problems);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated)
            navigate('/login')
    } , isAuthenticated);


    async function fetchProblem() {
        const { data } = await axiosClient.get('/user/allproblem');
        setProblems(data);

    }

    useEffect(() => {
        fetchProblem();
    }, []);

    const dispatch = useDispatch();

    const handleSubmit = ()=> {
        dispatch(logoutUser())
    };


    return (
        <>
            <nav className="py-3 px-10 border flex justify-between">
                <h2 className="font-bold text-2xl">LeetCode</h2>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-field hover:text-white hover:bg-black">{user?.firstname}</div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                        <li><button onClick={handleSubmit}>Logout</button></li>
                    </ul>
                </div>
                {/* <h2 className="font-bold bg-black rounded-2xl p-2 text-white">{user?.firstname}</h2> */}
            </nav>
            <div className="border">
                <div className="flex justify-around w-[70%]  mx-auto mt-5">
                    <select className="bg-black text-white rounded px-2">
                        <option>All Problems</option>
                        <option>Solved problems</option>
                    </select>
                    <select className="bg-black text-white rounded w-[20%]">
                        <option>All Dificulties</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                    <select className="bg-black text-white rounded px-2">
                        <option>All Tags</option>
                        <option>Array</option>
                        <option>Linked List</option>
                        <option>Graph</option>
                        <option>Dp</option>
                    </select>
                </div>
                {
                    problems?.map((item) => {
                        return <>
                            <div className="border rounded-2xl flex justify-between px-15 py-5 mt-5 w-[90%] mx-auto bg-black">
                                <div className=" flex items-center gap-5">
                                    <button className="text-white hover:text-blue-600 pointer-">{item?.title}</button>
                                    <span className="text-white bg-green-400 px-2 rounded-2xl">{item?.tag}</span>
                                </div>
                                <h4 className=" p-[1%] px-[4%] bg-amber-300 text-white font-bold rounded-2xl">{item?.difficultyLevel}</h4>
                            </div>
                        </>
                    })
                }
            </div>
        </>
    )
}

export default Homepage;