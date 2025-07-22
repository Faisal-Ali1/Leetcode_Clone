import Editor from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import axiosClient from '../utils/axiosClient';


function GetProblem() {

    const editorref = useRef(null);
    const {problemId} = useParams();
    const [problem, setProblem] = useState();
    const [activeLeftTag, setActiveLeftTab] = useState('description')
    const [activeRightTag, setActiveRightTag] = useState('code')
    const [language, selectLanguage] = useState('javascript')
    const [submitResult, setSubmitResult] = useState(null);
    const [runResult, setRunResult] = useState(null);
    const [ loading , setLoading ] = useState(false);

    // console.log(problemId);

    console.log(runResult);


    // fetching question
    useEffect(() => {

        const fetchData = async () => {
            const { data } = await axiosClient.get(`/user/getproblem/${problemId}`);
            setProblem(data);
        }

        fetchData()
    }, [problemId])


    function handleEditorDidMount(editor) {
        editorref.current = editor;
    }

    function showValue() {
        alert(editorref.current?.getValue());
        // console.log(editorref);


    }

    const runCode = async () => {
        try {
            setLoading(true);
            const runData = editorref.current?.getValue();
            console.log(language);
            
            const { data } = await axiosClient.post(`/problem/run/${problemId}`, {
                code: runData,
                language: language
            });
            alert('run successfully')

            setRunResult(data);
            setLoading(false);

        }
        catch (err) {
            console.log('Error: ' + err.message);

        }
    }

    const submitCode = async () => {
        try {
            const submitData = editorref.current?.getValue();
            const { data } = await axiosClient.post(`/problem/submit/${problemId}`, {
                code: submitData,
                language: language
            });

            setSubmitResult(data);
        }
        catch (err) {
            console.log('Error: ' + err.message);

        }
    }

    const getLanguageForMonaco = (lang) => {
        switch (lang) {
            case 'javascript': return 'javascript';
            case 'cpp': return 'cpp';
            case 'java': return 'java'
            default: return 'javascript'
        }

    }


    return (
        <>
            <div className='h-100vh'>
                <div className='flex '>

                    {/* Left Panel */}
                    {/* header buttons */}
                    <div className='w-[49%] scroll-auto h-[100vh] overflow-auto'>
                        {/* Left Panel buttons */}
                        <div className="flex gap-5 pl-4 py-2 bg-base-300">
                            <button onClick={() => setActiveLeftTab('description')} className={`btn  ${activeLeftTag === 'description' ? 'btn-error' : 'btn-primary'}`}>Description</button>
                            <button onClick={() => setActiveLeftTab('editorial')} className={`btn  ${activeLeftTag === 'editorial' ? 'btn-error' : 'btn-primary'}`}>Editorial</button>
                            <button onClick={() => setActiveLeftTab('solutions')} className={`btn  ${activeLeftTag === 'solutions' ? 'btn-error' : 'btn-primary'}`}>Solutions</button>
                            <button onClick={() => setActiveLeftTab('submissions')} className={`btn  ${activeLeftTag === 'submissions' ? 'btn-error' : 'btn-primary'}`}>Submissions</button>
                        </div>

                        <div className=' p-5 '>

                            {/* Description */}
                            {
                                activeLeftTag === 'description' ? (<div>
                                    <div className='flex gap-3 items-center mb-5'>
                                        <h2 className='font-bold text-3xl'>{problem?.title}</h2>
                                        <p className='border border-green-500 text-green-500 rounded px-4'>{problem?.difficultyLevel}</p>
                                        <p className='bg-blue-600 rounded text-white font-semibold px-4 border border-blue-600'>{problem?.tag}</p>
                                    </div>

                                    <div>
                                        <h3 className='font-semibold text-2xl mb-2'>Description</h3>
                                        <div className='bg-base-300 min-h-20 p-2 rounded  mb-10'>
                                            <p className=' mb-3'>{problem?.discription}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className='font-semibold text-2xl mb-2'>Examples:</h3>
                                        <div className='flex flex-col gap-5'>
                                            {
                                                problem?.visibleTestCases?.map((item, index) => (
                                                    <div key={index} className='bg-base-300 p-2 rounded'>

                                                        <h4 className='font-semibold'>Example {index + 1}</h4>
                                                        <p><span className='font-semibold'>Input:</span> {item?.input}</p>
                                                        <p><span className='font-semibold'>Output:</span> {item?.output}</p>
                                                        <p><span className='font-semibold'>Explanation:</span> {item.explanation}</p>
                                                    </div>
                                                ))

                                            }
                                        </div>
                                    </div>

                                </div>) : ""

                            }

                            {/* Editorial */}
                            {
                                activeLeftTag === 'editorial' ? (<div>
                                    <h2 className='text-3xl font-bold '>Editorial</h2>
                                </div>) : ""
                            }

                            {/* Solution */}
                            {
                                activeLeftTag === 'solutions' ? (<div className='w-[100%]'>
                                    <h2 className='text-3xl font-bold'>Solutions</h2>

                                    {
                                        problem?.refrenceSolution?.map((item, index) => (
                                            <div key={index} className='my-8 bg-black rounded flex flex-col gap-4 p-2 w-full'>
                                                <h2 className='bg-sky-300 rounded p-2 font-semibold'>{problem?.title} - {item?.language}</h2>
                                                <div className='  border-white'>
                                                    <pre className='bg-base-300 rounded p-2 w-full' >{item?.completeCode}</pre>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>) : ''
                            }

                            {/* Submission */}
                            {
                                activeLeftTag === 'submissions' ? (<div>
                                    <h2 className='text-3xl font-bold'>Submissions</h2>
                                    <div className='text-gray-700 font-semibold'>
                                        Your submission history will appear here.
                                    </div>
                                </div>) : ""
                            }
                        </div>
                    </div>


                    {/* Rigt Panel */}
                    {/* Right panel header button */}
                    <div className='w-[50%]  border-l border-white'>
                        <div className='flex gap-5 pl-4 py-2 bg-base-300'>
                            <button className={`btn ${activeRightTag === 'code'? 'btn-error' : 'btn-primary'}`} onClick={() => setActiveRightTag('code')}>Code</button>

                            <button className={`btn ${activeRightTag === 'testcase' ? 'btn-error' : 'btn-primary'}`} onClick={() => setActiveRightTag('testcase')}>Testcase</button>

                            <button className={`btn ${activeRightTag === 'result' ? 'btn-error' : 'btn-primary'}`} onClick={() => setActiveRightTag('result')}>Result</button>
                        </div>

                        <div className='p-2'>
                            {/* Code section*/}
                            {
                                activeRightTag === 'code' ? (<div>
                                    <div className='flex gap-3 py-2'>
                                        <button className={`btn  ${language === 'javascript' ? 'btn-error': 'btn-primary'}`} onClick={() => selectLanguage('javascript')}>JavaScript</button>
                                        <button className={`btn  ${language === 'java' ? 'btn-error': 'btn-primary'}`} onClick={() => selectLanguage('java')}>Java</button>
                                        <button className={`btn  ${language === 'cpp' ? 'btn-error': 'btn-primary'}`} onClick={() => selectLanguage('cpp')}>C++</button>
                                    </div>

                                    {/* Monaco Editor */}
                                    <Editor
                                        height="70vh"
                                        width="50vw"
                                        theme="vs-dark"
                                        defaultLanguage={getLanguageForMonaco(language)}
                                        defaultValue="//some comment"
                                        onMount={handleEditorDidMount}
                                    />
                                    <div className='flex gap-4 justify-end mt-2'>
                                        {/* <button className='btn btn-primary' onClick={showValue}>Show Value</button> */}
                                        <button 
                                            className='btn btn-primary' 
                                            onClick={runCode}
                                            disabled = {loading}>Run</button>
                                        <button 
                                            className='btn btn-primary'
                                            onClick={submitCode}
                                            disabled = {loading}>Submit </button>
                                            
                                    </div>
                                </div>) : ''
                            }

                            {/* Testcase section */}
                            {
                                activeRightTag === 'testcase' ? (
                                    <div>
                                        {
                                            (runResult) ? (

                                                
                                                <div>
                                                    {
                                                        (runResult[0].status.description === 'Accepted')?(<h2 className='font-semibold text-xl'> 🎉 Congrates! your code has successfully run</h2>):(<h2 className='font-semibold text-xl'>❌ Bad Luck ! Failed</h2>)
                                                    }
                                                    

                                                    <h3 className='mt-3 font-semibold'>Total no of TestCases Passed:  /{runResult.length}</h3>

                                                    <h3 className='font-semibold mt-3'>TestCases</h3>
                                                    {
                                                        runResult.map( (item , index) => (
                                                            <div key={index} className={` p-2 rounded mt-2 ${item.status.description === 'Accepted' ? 'bg-green-300' : 'bg-red-300'}`}>
                                                                <p><span className='font-semibold'>status:</span> {item.status.description}</p>
                                                                <p><span className='font-semibold'>input:</span> {item.stdin}</p>
                                                                <p><span className='font-semibold'>Output:</span> {item.expected_output}</p>
                                                                <p><span className='font-semibold'>Time taken:</span> {item.time}</p>
                                                                <p><span className='font-semibold'>memory:</span> {item.momory}</p>
                                                            </div>
                                                        ))
                                                    }
                                                       
                                                </div>
                                            ) : (
                                                <div>
                                                    <h2 className='font-semibold text-xl mb-3'>Test Result</h2>
                                                    <p className='text-gray-500'>Click "Run" to test your code with the example test cases.</p>
                                                </div>
                                            )
                                        }

                                    </div>
                                ) : ''
                            }

                            {/* Result section */}
                            {
                                activeRightTag === 'result' ? (
                                    <div>
                                        <h2 className='font-semibold text-xl  mb-3'>
                                            Submission Result
                                        </h2>
                                        <p className='text-gray-500'>Click "Submit" to submit your solution for evaluation.</p>
                                    </div>
                                ) : ''
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default GetProblem;