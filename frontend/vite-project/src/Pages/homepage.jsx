import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { useDispatch } from "react-redux";
import { logoutUser } from '../authSlice';
import { NavLink, useNavigate } from "react-router";


function Homepage() {

    const [problem, setProblem] = useState([]);
    const [solvedproblem, setSolvedProblem] = useState([]);
    const dispatch = useDispatch()
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth)
    const [filter, setFilter] = useState({
        difficultyLevel: 'all',
        tag: 'all',
        status: 'all'
    });

    // console.log(filter);
    // console.log(problem);




    const handlelogout = () => {
        dispatch(logoutUser());
    }
    // console.log('user', user);
    // console.log('isAuth', isAuthenticated);



    useEffect(() => {
        if (!isAuthenticated)
            Navigate('/login')
    }, []);


    // Fetching all problems and Solved problems from backend
    useEffect(() => {
        const fetchProblem = async () => {
            const { data } = await axiosClient.get('/user/allproblem');
            setProblem(data);
        }

        const fetchSolvedProblem = async () => {
            const { data } = await axiosClient.get('/user/getallsolvedproblem');
            setSolvedProblem(data);
        }

        fetchProblem();

        if (user)
            fetchSolvedProblem();
    }, [user])

    // Filtering problem
    const filteredProblem = problem.filter(prob => {

        const difficultyMatch = filter.difficultyLevel === 'all' || filter.difficultyLevel === prob.difficultyLevel;
        const tagMatch = filter.tag === 'all' || filter.tag === prob.tag;
        const statusMatch = filter.status === 'all' || solvedproblem.some(sp => sp._id === prob._id);

        return difficultyMatch && tagMatch && statusMatch;
    })

    if (loading){
        return (
            <>
                <div className="h-full flex justify-center items-center">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            </>
        )
    }
        

    return (
        <>
            {/* navbar */}
            <nav className="shadow-lg   flex justify-between items-center py-2  px-10 min-height-screen">
                <h2 className="text-2xl font-bold italic ">LeetCode</h2>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 bg-black text-white border-none rounded-2xl">{user.firstname}</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-black text-white  rounded-box z-1 w-52 p-2 shadow-lg">
                        {user.role === 'admin' ? (<li className="hover:text-red-500"><NavLink to="/admin">Admin dashboard</NavLink></li>) : ''}
                        <li className="hover:text-red-500"><button onClick={handlelogout}>Logout</button></li>

                    </ul>
                </div>
            </nav>

            {/* problem-section */}
            <div className="  w-[85%] m-auto mt-10">
                <div>
                    {/* Filter section */}
                    <div className=" flex justify-around mb-10">
                        <select
                            className="select"
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
                            <option value="all">All Problem</option>
                            <option value="solved">Solved Problem</option>
                        </select>

                        <select
                            className="select"
                            value={filter.tag}
                            onChange={(e) => setFilter({ ...filter, tag: e.target.value })}>
                            <option value="all">All deficulty</option>
                            <option value="array">Array</option>
                            <option value="linked list">Linked List</option>
                            <option value="graph">Graph</option>
                            <option value="dp">Dp</option>
                        </select>

                        <select
                            className="select"
                            value={filter.difficultyLevel}
                            onChange={(e) => setFilter({ ...filter, difficultyLevel: e.target.value })}>
                            <option value="all">All</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    {/* printing problem on the screen */}
                    <div className="flex flex-col gap-5">
                        {
                            filteredProblem.map(item => (

                                <div key={item._id} className="border flex justify-between items-center py-4 px-5 rounded-2xl bg-black text-white h-25 ">
                                    <div>
                                        
                                        <p className="cursor-pointer h-6  hover:text-blue-500  mb-2"><NavLink to={`/getproblem/${item._id}`}>{item?.title}</NavLink></p>
                                        <p className="bg-pink-300 py-1 px-1 w-20 text-center rounded-2xl">{item?.difficultyLevel}</p>
                                    </div>
                                    <span className="btn btn-primary cursor-default">{item?.tag}</span>
                                </div>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )

    // const [problems, setProblems] = useState([]);
    // const {user , isAuthenticated} = useSelector((state) => state.auth);

    // console.log(problems);

    // const navigate = useNavigate();

    // useEffect(()=>{
    //     if(!isAuthenticated)
    //         navigate('/login')
    // } , isAuthenticated);


    // async function fetchProblem() {
    //     const { data } = await axiosClient.get('/user/allproblem');
    //     setProblems(data);

    // }

    // useEffect(() => {
    //     fetchProblem();
    // }, []);

    // const dispatch = useDispatch();

    // const handleSubmit = ()=> {
    //     dispatch(logoutUser())
    // };


    // return (
    //     <>
    //         <nav className="py-3 px-10 border flex justify-between">
    //             <h2 className="font-bold text-2xl">LeetCode</h2>
    //             <div className="dropdown dropdown-end">
    //                 <div tabIndex={0} role="button" className="btn btn-ghost rounded-field hover:text-white hover:bg-black">{user?.firstname}</div>
    //                 <ul
    //                     tabIndex={0}
    //                     className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
    //                     <li><button onClick={handleSubmit}>Logout</button></li>
    //                 </ul>
    //             </div>
    //             {/* <h2 className="font-bold bg-black rounded-2xl p-2 text-white">{user?.firstname}</h2> */}
    //         </nav>
    //         <div className="border">
    //             <div className="flex justify-around w-[70%]  mx-auto mt-5">
    //                 <select className="bg-black text-white rounded px-2">
    //                     <option>All Problems</option>
    //                     <option>Solved problems</option>
    //                 </select>
    //                 <select className="bg-black text-white rounded w-[20%]">
    //                     <option>All Dificulties</option>
    //                     <option>Easy</option>
    //                     <option>Medium</option>
    //                     <option>Hard</option>
    //                 </select>
    //                 <select className="bg-black text-white rounded px-2">
    //                     <option>All Tags</option>
    //                     <option>Array</option>
    //                     <option>Linked List</option>
    //                     <option>Graph</option>
    //                     <option>Dp</option>
    //                 </select>
    //             </div>
    //             {
    //                 problems?.map((item) => {
    //                     return <>
    //                         <div className="border rounded-2xl flex justify-between px-15 py-5 mt-5 w-[90%] mx-auto bg-black">
    //                             <div className=" flex items-center gap-5">
    //                                 <button className="text-white hover:text-blue-600 pointer-">{item?.title}</button>
    //                                 <span className="text-white bg-green-400 px-2 rounded-2xl">{item?.tag}</span>
    //                             </div>
    //                             <h4 className=" p-[1%] px-[4%] bg-amber-300 text-white font-bold rounded-2xl">{item?.difficultyLevel}</h4>
    //                         </div>
    //                     </>
    //                 })
    //             }
    //         </div>
    //     </>
    // )
}

export default Homepage;