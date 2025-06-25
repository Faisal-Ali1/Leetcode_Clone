const axios = require('axios');

// function getlanguageId(lang) {

//     const language = {
//         'c++': 54,
//         'java': 62,
//         'javascript': 63
//     }

//     return language[lang];
// }

function getLanguageId(lang) {

    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63
    }

    return language[lang];
}

async function waiting(timer) {
    setTimeout(() => {
        return 1;
    }, timer);
}


const submitBatch = async (submissions) => {

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_key,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    return await fetchData();

}


const sendBatch = async (token) => {

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: token.map(item => item.token).join(","),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': 'd212abf86fmsh5852b1e12b6d023p17a50bjsnf6444b64becd',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }


    while (true) {

        const result = await fetchData();
        const isTrue = result.submissions.every((item) => item.status_id > 2);

        if (isTrue)
            return result.submissions;

        waiting(1000);

    }






}



module.exports = { getLanguageId, submitBatch, sendBatch };


