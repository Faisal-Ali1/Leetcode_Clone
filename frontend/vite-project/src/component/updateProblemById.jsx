import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { data, useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";

function UpdateProblem() {

    const [problem, setProblem] = useState(null);
    const [error, setError] = useState(null);
    const [ construct , setconstruct ] = useState(true);
    const { id } = useParams();
    console.log(id);


    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get(`/user/getproblem/${id}`);
            setProblem(data);
        }
        catch (err) {
            setError('Failed to fetch problem');
            console.error('Error: ', error);

        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    console.log(problem);

    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const { fields: visibleFields,
        append: appendVisible,
        remove: removeVisible
    } = useFieldArray({
        control,
        name: "visibleTestCases"
    })



    return (
        <>
            <div className="p-20">
                <h2 className="text-3xl font-bold text-center mb-5">Update Problem</h2>
                <div className="relative">

                    {/* project is under construction */}
                    {
                        construct ? <div className="absolute z-99 border w-full h-full flex justify-center items-center font-bold skeleton bg-amber-300 "> <p className="text-4xl max-sm:text-2xl text-center">Page is under construction</p></div>:""
                    }
                    <form onSubmit={handleSubmit((data) => console.log(data))}>

                        <div className="shadow-2xl">
                            {/* Title */}
                            <div>
                                <label className="label">Title</label>
                                <input
                                    type="text"
                                    className="input"
                                    {...register('title', { required: true, min: 5 })} />
                            </div>

                            {/* difficulty Level */}
                            <div>
                                <label>DifficultyLevel</label>
                                <select
                                    className="select"
                                    {...register('difficultyLevel', { required: true })}>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            {/* Tag */}
                            <div>
                                <label>Tag</label>
                                <select
                                    className="select"
                                    {...register('tag', { required: true })}>
                                    <option value="array">Array</option>
                                    <option value="linked list">Linked List</option>
                                    <option value="graph">graph</option>
                                    <option value="dp">Dp</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    className="textarea"
                                    {...register('description', { required: true, min: 5 })} />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">TestCases</h2>

                            {/* Visible Test Cases */}
                            <div >
                                <div className="flex justify-between mb-5">
                                <h4 className="font-semibold">Visible Test Cases</h4>
                                <button 
                                    type="button"
                                    aria-required = {true}
                                    className="btn btn-primary text-xs"
                                    onClick={() => 
                                        appendVisible({input: '' , output: '' , explanation: ''})}>Add Visible Case</button>
                                    </div>
                                    <div>
                                        {
                                         visibleFields.map( (fields , index) => (
                                            <div key={fields.id}>
                                                <div className="flex justify-end">
                                                    <button 
                                                        type="button"
                                                        onClick={()=> removeVisible(index)}
                                                        className="btn btn-error text-xs">Remove</button>
                                                </div>
                                                
                                                
                                                <input 
                                                    type="text"
                                                    // defaultValue={item?.input}
                                                    placeholder="Input"
                                                    className="input w-full"
                                                    {...register(`visibleTestCases.${index}.input`)} />

                                                
                                                <input 
                                                    type="text"
                                                    // defaultValue={item?.output}
                                                    placeholder="Output"
                                                    className="input w-full"
                                                    {...register(`visibleTestCases.${index}.output`)} />
                                                
                                                
                                                <textarea 
                                                    type="textarea"
                                                    // defaultValue={item?.explanation}
                                                    placeholder="Explanation"
                                                    className="textarea w-full"
                                                    {...register(`visibleTestCases.${index}.explanation`)}></textarea>
                                            </div>
                                        ))  
                                       }
                                      
                                    </div>
                            </div>

                            {/* Hidden Test Cases */}
                            <div className="flex justify-between">
                                <h2 className="font-semibold">Hiden Test Case</h2>
                                <button className="btn btn-primary text-xs">Add Hidden Case</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProblem;