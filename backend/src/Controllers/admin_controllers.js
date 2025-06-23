const user = require('../Modals/userSchema');
const problem = require('../Modals/problemSchema');
const { getLanguageId, submitBatch, sendBatch } = require('../Utils/problemUtils');


const panel = (req, res) => {

    try {

        res.send('admin panel')
    }
    catch (err) {
        res.send('Error: ' + err.message)
    }
}

const register = async (req, res) => {
    try {

        if (!req.body.role)
            throw new Error('enter role');

        await user.insertOne(req.body)

        if (req.body.role === 'user')
            res.send('user registered successfully')

        if (req.body.role === 'admin')
            res.send('admin registered successfully')

    }
    catch (err) {
        res.status(400).send('Error: ' + err.message)
    }
}

const deletee = async (req, res) => {

    try {

        const person = await user.findOne({ email: req.body.email })

        if (!person)
            throw new Error('data not found');

        if (person.email === 'faisal@gmail.com')
            throw new Error('unable to delete main admin');

        const role = person.role;

        await user.deleteOne({ email: person.email })

        if (role === 'admin')
            res.send('admin data deleted successfully')
        else
            res.send('user data deleted sucessfully')



    }
    catch (err) {
        res.send('Error: ' + err.message)
    }
}


// problem creation

const createProblem = async (req, res) => {

    try {
        if (!req.body)
            throw new Error("create a problem first");

        const mandetoryFields = ['title', 'difficultyLevel', 'discription', 'visibleTestCases', 'starterCode', 'refrenceSolution', 'hiddenTestCases'];

        const isAvail = mandetoryFields.every(item => Object.keys(req.body).includes(item));

        if (!isAvail)
            throw new Error("Fields missing");


        const { refrenceSolution, visibleTestCases } = req.body;

        for (let { language, completeCode } of refrenceSolution) {

            const languageId = getLanguageId(language.toLowerCase());

            const submissions = visibleTestCases.map(testCase => ({

                source_code: completeCode,
                language_id: languageId,
                stdin: testCase.input,
                expected_output: testCase.output

            }))


            const token = await submitBatch(submissions);


            // const resultTokens = await getToken(result);


            const result = await sendBatch(token);

            // checking status of program by status_id
            // console.log(result);

            for (let item of result) {
                // console.log(item);

                if (item.status_id == 4)
                    res.status(400).send('Wrong Answer')

                else if (item.status_id == 5)
                    res.status(400).send('Time Limit Exceeded')

                else if (item.status_id == 6)
                    res.status(400).send('Compilation Error')

                else if (item.status_id == 7 || item.status_id == 8 || item.status_id == 9 || item.status_id == 10 || item.status_id == 11 || item.status_id == 12)
                    res.status(400).send('Runtime Error (SIGSEGV)')

                else if (item.status_id == 13)
                    res.status(400).send('Internal Error')

                else if (item.status_id == 14)
                    res.status(400).send('Exec Format Error')

            }

        }

        // addding question into databasa
        await problem.insertOne({ ...req.body, problemCreator: req.adminData._id });

        res.status(200).send("Question added successfully into database")

    }
    catch (err) {
        res.status(400).send('Error: ' + err.message)
    }

}

const updateProblem = async (req, res) => {

    try {
        if (!req.body)
            throw new Error("Enter data for updation");

        const { id } = req.params;


        const prob = await problem.findOne({ _id: id });

        if (!prob)
            throw new Error('Question not found');

        const mandetoryFields = ['title', 'difficultyLevel', 'discription', 'visibleTestCases', 'starterCode', 'refrenceSolution'];

        const isAvail = mandetoryFields.every(item => Object.keys(req.body).includes(item));

        if (!isAvail)
            throw new Error('Fields missing')

        const { refrenceSolution, visibleTestCases } = req.body;

        for (let { language, completeCode } of refrenceSolution) {

            // language_id
            // source_code
            // stdin
            // expected_output

            const languageId = getLanguageId(language.toLowerCase());

            const submissions = visibleTestCases.map(({ input, output }) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: input,
                expected_output: output

            }));

            const token = await submitBatch(submissions);
            const result = await sendBatch(token);

            for (let item of result) {

                if (item.status_id == 4)
                    res.status(400).send('Wrong Answer')

                else if (item.status_id == 5)
                    res.status(400).send('Time Limit Exceeded')

                else if (item.status_id == 6)
                    res.status(400).send('Compilation Error')

                else if (item.status_id == 7 || item.status_id == 8 || item.status_id == 9 || item.status_id == 10 || item.status_id == 11 || item.status_id == 12)
                    res.status(400).send('Runtime Error (SIGSEGV)')

                else if (item.status_id == 13)
                    res.status(400).send('Internal Error')

                else if (item.status_id == 14)
                    res.status(400).send('Exec Format Error')

            }


        }

        await problem.updateOne({ _id: id }, { ...req.body, problemUpdater: req.adminData._id }, { runValidators: true });

        res.send('Problem updated sucessfully');
    }
    catch (err) {
        res.status(400).send('Error: ' + err.message)
    }
}

const deleteProblem = async (req, res) => {

    try {
        const { id } = req.params;

        if (!id)
            return res.status(404).send('id is missing');

        const deleteProb = await problem.findByIdAndDelete(id);

        if (!deleteProb)
            return res.status(404).send("problem not found")

        res.status(200).send('Problem deleted successfully')


    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}



module.exports = { panel, register, deletee, createProblem, updateProblem, deleteProblem }; 