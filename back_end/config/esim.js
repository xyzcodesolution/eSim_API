const axios = require("axios");
const fs = require("fs").promises;
const baseUrl = "https://global1simapi.roamhostapi.com/api/";
const headers = {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
    }
module.exports.getTokenHeader = async () => {
    try {
        await fs.access("./store/token.json", fs.constants.F_OK);
        const data = await fs.readFile("./store/token.json", "utf8");
        const json_data = JSON.parse(data);
        const time_now = new Date().getTime();
        return Math.abs(time_now - json_data.generatedTime) > (json_data.expireInSeconds * 1000) ? await makeAndSaveToken() : json_data;
    } catch (err) {
        return await makeAndSaveToken();
    }
}

const makeRealUrl = (url) => {
    return baseUrl + url;
}

const makeAndSaveToken = async () => {
    const paramJson = {
        "password": "Aeh454*97!sd6Sf!k",
        "userNameOrEmailAddress": "arka.roam",
        "rememberClient": "true"
    }
    console.log("make function");
    try {
        const response = await axios.post(makeRealUrl('TokenAuth/Authenticate'), paramJson, { headers });
        const saveData = {
            "headers": {
                'Authorization': `Bearer ${response.data.result.accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            "expireInSeconds": 86400,
            "userId": 10024,
            "generatedTime": new Date().getTime()
        }
        fs.writeFile("./store/token.json", JSON.stringify(saveData), (error) => {
            console.log(error);
        });
        return saveData;
    } catch (e) {
        return false;
    }
}