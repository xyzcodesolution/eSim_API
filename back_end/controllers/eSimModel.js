
const axios = require("axios");
const { getTokenHeader } = require("../config/esim");
const baseUrl = "https://global1simapi.roamhostapi.com/api/";
const makeRealUrl = (url) => {
    return baseUrl + url;
}

const prepaid_package_template = async (req, res) => {
    const { headers } = await getTokenHeader();
    const response = await axios.post(makeRealUrl("services/app/GlobalTV/PrepaidPackageTemplate"), req.body, { headers });
    let result = [];
    const templates = response.data.result.listPrepaidPackageTemplate.template;
    templates.map(temp => {
        result.push({
            package_id : temp.prepaidpackagetemplateid,
            package_name: temp.prepaidpackagetemplatename,
            location_name: temp.rdbLocationZones.locationzonename,
            cost: temp.cost,
            perioddays: temp.perioddays,
            location_id : temp.rdbLocationZones.locationzoneid,
            giga_data: temp.databyte / Math.pow(1024, 3)
        });
    });
    res.json({ result });
}

module.exports = { prepaid_package_template }