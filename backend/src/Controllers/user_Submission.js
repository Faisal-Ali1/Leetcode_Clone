const { getLanguageId, submitBatch, sendBatch } = require('../Utils/problemUtils');
const problem = require('../Modals/problemSchema');
const submission = require('../Modals/submissionSchema');
const user = require('../Modals/userSchema');


const submitCode = async (req, res) => {
    try {

        const userId = req.result._id;
        const problemId = req.params.id;
        let language = req.body.language;
        const code = req.body.code;

        if (language === 'cpp')
            language = 'c++';

        // checking every thing is present or not
        if (!userId || !problemId || !language || !code) {
            return res.status(404).send('fields are missing');
        }

        const languageId = getLanguageId(language);

        const prob = await problem.findById(problemId);

        if (!prob)
            throw new Error('problem not found');

        const totalTestCases = prob.hiddenTestCases.length;

        const submittedCode = await submission.insertOne({ userId, problemId, language, code, totalTestCases });


        // creating submission
        const sub = prob.hiddenTestCases.map(testCase => ({
            source_code: code,
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }))


        const token = await submitBatch(sub);

        const result = await sendBatch(token);

        let status = 'pending';
        let memory = 0;
        let runtime = 0;
        let errorMessage = null;
        testCasesPassed = 0;

        for (let item of result) {

            if (item.status_id === 3) {
                status = 'accepted';
                memory = Math.max(memory, item.memory);
                runtime += parseFloat(item.time);
                testCasesPassed += 1;
            }
            else if (item.status === 4) {
                status = 'wrong answer';
                errorMessage = item.stderr
            }
            else {
                status = 'error',
                    errorMessage = item.stderr
            }
        }

        submittedCode.status = status;
        submittedCode.memory = memory;
        submittedCode.runtime = runtime;
        submittedCode.errorMessage = errorMessage;
        submittedCode.testCasesPassed = testCasesPassed;

        await submittedCode.save();

        const person = await user.findById(userId);

        if (!person)
            throw new Error('person not found');

        if (!person.problemSolved.includes(prob._id)) {
            // console.log(prob._id);

            person.problemSolved.push(prob._id);
            await person.save();
        }


        res.status(201).send('answer submited successfully');

    }
    catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
}

const runCode = async (req, res) => {
    try {

        if (!req.body || !req.body.language || !req.body.code)
            return res.status(400).send('Fields missing');
        
        const userId = req.result._id;
        const problemId = req.params.id;
        let language = req.body.language;
        const code = req.body.code;


        if (language === 'cpp')
            language = 'c++';


        if (!userId || !problemId)
            return res.status(400).send('fields missing');


        const languageId = getLanguageId(language);

        const prob = await problem.findById(problemId);

        if (!prob)
            return res.status(404).send('question not found');

        const submission = prob.visibleTestCases.map(testCase => ({
            source_code: code,
            language_id: languageId,
            stdin: testCase.input,
            expected_output: testCase.output
        }));

        const token = await submitBatch(submission);
        const result = await sendBatch(token);

        const newResult = result.map(item => ({
            status: item.status,
            expected_output: item.expected_output,
            stdin: item.stdin,
            time: item.time,
            momory: item.memory
        }))

        res.status(200).send(newResult);
    }
    catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
}

const getAllSubmission = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.pid;

        const allSubmission = await submission.find({ userId, problemId });

        if (allSubmission.length === 0)
            return res.status(200).send('no submission yet');

        res.status(200).send(allSubmission);
    }
    catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}


module.exports = { submitCode, runCode, getAllSubmission };

