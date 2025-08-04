import { NavLink } from "react-router";

function AdminPanel(){
    return(
        <div className="text-center">
            <h2 className="font-bold text-3xl mt-10">Admin Panel</h2>
            <p className="font-semibold">Manage Coding problem on your platform</p>
            <div className="grid grid-cols-3 gap-7 mt-10 w-[80%] m-auto max-md:grid-cols-1">

                {/* Create Problem */}
                <div className="card shadow-xl flex flex-col items-center gap-7 p-7 rounded justify-center bg-green-200 skeleton hover:-translate-y-2">
                    <svg viewBox="0 0 24 24" fill="none" width="50" height="50" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5"></circle> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    <div>
                    <h3 className="text-xl font-bold">Create Problem</h3>
                    <p className="text-sm font-semibold">Add a new coding problem to the platform</p>
                    </div>
                    <NavLink to="/admin/createproblem" className="btn btn-success">Create Problem</NavLink>
                </div>

                {/* Update Problem */}
                <div className="shadow-xl flex flex-col items-center gap-7 p-7 rounded justify-center  bg-amber-200 skeleton hover:-translate-y-2">
                    <svg viewBox="0 0 24 24" fill="none" width="50" height="50" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z" fill="#000000"></path></g></svg>
                    <div>
                    <h3 className="text-xl font-bold">Update Problem</h3>
                    <p className="text-sm font-semibold">Edit existing problem and their details</p>
                    </div>
                    <NavLink to="/admin/updateproblem" className="btn btn-warning">Update Problem</NavLink>
                </div>

                {/* Delete Problem */}
                <div className="shadow-xl flex flex-col items-center gap-7 p-7 rounded justify-center  bg-red-200 skeleton hover:-translate-y-2">
                    <svg viewBox="0 0 24 24" fill="none" width="50" height="50" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                    </svg>
                    <div>
                    <h3 className="text-xl font-bold">Delete Problem</h3>
                    <p className="text-sm font-semibold">Remove problems from the platform</p>
                    </div>
                    <NavLink to="/admin/deleteproblem" className=" btn btn-error">Delete Problem</NavLink>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;