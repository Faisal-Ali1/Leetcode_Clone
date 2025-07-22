import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

function Deleteproblem() {

    const [problem, setProblem] = useState(null);
    const [ error , setError ] = useState(null);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('/user/allproblem');
            setProblem(data);
        }
        catch (err) {
            setError('Failed to fetch problem');
            console.error('Error: ', err.message);

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(problem);

    // handling delete button
    const handleDelete = async (probId) => {
        if (!(window.confirm(`Are you sure want to delete this problem ?`)))
            return;
        try{
             await axiosClient.delete(`/admin/deleteproblem/${probId}`);
            setProblem(problem.filter(item => item._id !== probId));
        }
        catch(err){
            setError('Failed to delete problem');
            console.error('Error: ' , err);
            
        }
        

    }


    return (
        <>
            <div className="p-13">
                
                    <h2 className="text-3xl font-bold mb-5 ">Delete Problem</h2>
                    <div>
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="">Title</th>
                                    <th>Difficulty</th>
                                    <th>Tags</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                problem?.map((item, index) => (
                                    <tr key={item._id} className="font-semibold">
                                        <td >{index + 1}.</td>
                                        <td className="text-2xl">{item.title}</td>
                                        <td> <p className="bg-amber-300 py-2 w-15 text-center rounded">{item.difficultyLevel}</p></td>
                                        <td><p className="border w-15 py-1 text-center rounded">{item.tag}</p></td>
                                        <td><button className="btn btn-error" onClick={() => handleDelete(item._id)}>Delete</button></td>
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

export default Deleteproblem;