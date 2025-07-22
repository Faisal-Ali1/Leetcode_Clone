import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { NavLink } from "react-router";


function UpdateProblemPage() {

    const [problem, setProblem] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('/user/allproblem');
            setProblem(data);
        }
        catch (err) {
            setError('Failed to fetch problem');
            console.error('Error: ', error);

        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="p-13">
                <h2 className="text-3xl font-bold mb-5">Update problem</h2>
                <div className=" min-w-full ">

                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Difficulty</th>
                                <th>Tag</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                problem?.map((item, index) => (
                                    <tr key={item._id} className="font-semibold">
                                        <td>{index + 1}.</td>
                                        <td className=" text-xl"><h2>{item.title}</h2></td>
                                        <td ><p className="bg-amber-300 py-2 rounded w-15 text-center">{item.difficultyLevel}</p></td>
                                        <td><p className="border w-15 py-1 text-center rounded">{item.tag}</p></td>
                                        <td><NavLink to={`/admin/updateproblem/${item._id}`} className="btn btn-primary skeleton bg-blue-800 border-none hover:bg-red-600">Update</NavLink></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default UpdateProblemPage;