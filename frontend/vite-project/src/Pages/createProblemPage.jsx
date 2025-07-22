import { useFieldArray, useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";

const problemSchema = z.object({
    title: z.string().min(1, 'title is required'),

    difficultyLevel: z.enum(['easy', 'medium', 'hard']),

    tag: z.enum(['array', 'linked list', 'graph', 'dp']),

    discription: z.string().min(1, "discription is required"),

    visibleTestCases: z.array(
        z.object({
            input: z.string().min(1, "input is required"),
            output: z.string().min(1, "output is required"),
            explanation: z.string().min(2, "explanation is required")
        })
    ).min(1, "Atleast One Visible Test Case is required"),

    hiddenTestCases: z.array(
        z.object({
            input: z.string().min(1, "input is required"),
            output: z.string().min(1, "output is required")
        })
    ).min(1, "Atleast one Hidden Test Case is required"),

    starterCode: z.array(
        z.object({
            language: z.enum(['c++', 'javascript', 'java']),
            initialCode: z.string().min(1, "initialCode is required")
        })
    ).length(3, "All three language are required"),

    refrenceSolution: z.array(
        z.object({
            language: z.enum(['c++', 'javascript', 'java']),
            completeCode: z.string().min(1, "complete code is required")
        })
    ).length(3, "All languages are required")

});



function CreateProblemPage() {

    const navigate = useNavigate();
    const { register, control, handleSubmit, formState: { errors } } = useForm(
            {
            resolver: zodResolver(problemSchema),
            defaultValues: {
                starterCode: [
                    { language: 'c++', initialCode: '' },
                    { language: 'javascript', initialCode: '' },
                    { language: 'java', initialCode: '' }
                ],
                refrenceSolution: [
                    { language: 'c++', completeCode: '' },
                    { language: 'javascript', completeCode: '' },
                    { language: 'java', completeCode: '' }
                ]
            }
        }
    );


    const {
        fields: visibleFields,
        append: appendVisible,
        remove: removeVisible
    } = useFieldArray({
        control,
        name: 'visibleTestCases'
    });

    const {
        fields: hiddenFields,
        append: appendHidden,
        remove: removeHidden
    } = useFieldArray({
        control,
        name: 'hiddenTestCases'
    })

    const onSubmit = async (data) => {
        try {
            console.log(data);
            await axiosClient.post('/admin/createproblem' , data);
            alert('Problem created successfully');
            navigate('/');
        }
        catch (error) {
            console.log(error);
            
            alert('Error: ', error.response?.data?.message || error.message)
        }

    }


    return (
        <div>
            <div className=" w-[90%] m-auto rounded-xl mt-10">
                <h1 className="text-center text-3xl font-bold text-blue-500">Create New Problem</h1>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="form">


                    {/* Title  */}
                    <div className=" card shadow-xl rounded-xl p-5 ">
                        <div className="flex flex-col gap-2">
                            <label className="font-bold">Title:*</label>
                            <input
                                type="text"
                                className={`input w-100  ${errors.title && 'input-error'}`}
                                placeholder="Enter title here"
                                {...register('title')}
                                required={true}
                            />
                            {errors.title && (<span className="text-red-500 font-semibold">{errors.title.message}</span>)}
                        </div>

                        {/* difficulty level */}
                        <div className="flex flex-col gap-2 mt-5">
                            <label className="font-bold">DifficultyLevel:*</label>
                            <select
                                {...register("difficultyLevel")}
                                className="select"
                                // defaultValue=""
                                required={true}>
                                <option value="" disabled>Choose Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            {errors.difficultyLevel && (<span className="text-red-500">{errors.difficultyLevel.message}</span>)}
                        </div>

                        {/* tag */}
                        <div className="flex flex-col gap-2 mt-5">
                            <label className="font-bold">Tag:*</label>
                            <select
                                {...register("tag")}
                                className="select"
                                defaultValue=""
                                required={true}>
                                <option value="" disabled>Choose Tag</option>
                                <option value="array">Array</option>
                                <option value="linked list">Linked List</option>
                                <option value="graph">Graph</option>
                                <option value="dp">Dp</option>
                            </select>
                        </div>

                        {/* discription */}
                        <div className="flex flex-col gap-2 mt-5">
                            <label className="font-bold">Discription:*</label>
                            <textarea
                                type="textarea"
                                className={`textarea w-full ${errors.discription && 'input-error'}`}
                                placeholder="Enter description here"
                                {...register("discription")}
                                required={true}
                            />
                            {errors.discription && (<span className="text-red-500 font-semibold">{errors.discription.message}</span>)}
                        </div>
                    </div>

                    {/* Test Cases */}
                    <div className="mt-7 p-5 card shadow-lg rounded-xl ">
                        <h2 className="text-3xl font-bold">TestCases</h2>
                        <div className="rounded-xl ">

                            {/* Visible Test Case */}
                            <div className="flex justify-between  my-5 items-center ">
                                <h3 className="font-semibold">Visible Test Cases</h3>
                                <button
                                    aria-required={true}
                                    type="button"
                                    onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                                    className="btn btn-primary btn-sm"
                                >Add Visible Case</button>
                            </div>
                            {
                                visibleFields.map((fields, index) => (
                                    <div key={fields.id} className=" rounded-xl p-2 flex flex-col gap-2 mb-4 bg-amber-100">
                                        <div className="flex justify-end mb-2 ">
                                            <button onClick={() => removeVisible(index)} className="btn btn-error btn-xs">remove</button>
                                        </div>

                                        <input
                                            {...register(`visibleTestCases.${index}.input`)}
                                            placeholder="Input"
                                            className={`input input-bordered w-full `}
                                            required= {true}
                                        />

                                        <input
                                            {...register(`visibleTestCases.${index}.output`)}
                                            placeholder="Output"
                                            className="input input-bordered w-full"
                                            required= {true}
                                        />

                                        <textarea
                                            {...register(`visibleTestCases.${index}.explanation`)}
                                            placeholder="Explanation"
                                            className="textarea textarea-bordered w-full" />

                                    </div>
                                ))
                            }
                        </div>


                        {/* Hidden Test Case */}
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold">Hidden Test Cases</h2>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => appendHidden({ input: '', output: '' })}>Add Hidden Case</button>
                        </div>
                        {
                            hiddenFields.map((fields, index) => (
                                <div key={fields.id} className=" rounded-xl p-2 flex flex-col gap-2 mb-4 bg-pink-100">
                                    <div className="flex justify-end mb-2">
                                        <button
                                            type="button"
                                            className="btn btn-error btn-xs "
                                            onClick={() => removeHidden(index)}>remove</button>
                                    </div>

                                    <input
                                        placeholder="Input"
                                        className="input w-full"
                                        {...register(`hiddenTestCases.${index}.input`)} />

                                    <input
                                        placeholder="Output"
                                        className="input w-full"
                                        {...register(`hiddenTestCases.${index}.output`)}


                                    />
                                </div>
                            ))
                        }
                    </div>

                    {/* Code templates */}
                    <div className="mt-7 p-5 card shadow-xl">
                        <h2 className="text-3xl font-semibold">Code Templates</h2>
                        <div>
                            {
                                [0, 1, 2].map(index => (
                                    <div key={index} className="flex flex-col gap-2 mt-7">
                                        <h3 className="text-xl font-semibold">
                                            {index === 0 ? 'c++' : index === 1 ? 'javascript' : 'java'}
                                        </h3>

                                        {/* Initial Code */}
                                        <div className="mb-2">
                                            <label className="label">
                                                <span className="label-text">Initial Code*</span>
                                            </label>

                                            <textarea
                                                className={`textarea mt-2 w-full bg-base-300 border-none`}
                                                {...register(`starterCode.${index}.initialCode`)}
                                                rows={8}
                                                required={true} />

                                        </div>

                                        {/* Refrence Solution */}
                                        <div>
                                            <label className="label" >
                                                <span className="label-text">Refrence Solution*</span>
                                            </label>
                                            <pre>
                                                <textarea
                                                    className="textarea font-mono mt-2 w-full bg-base-300 border-none"
                                                    {...register(`refrenceSolution.${index}.completeCode`)}
                                                    rows={8}
                                                    required={true} />
                                            </pre>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-5 mb-10">Create Problem</button>
                </form>
            </div >
        </div >
    )
}

export default CreateProblemPage;