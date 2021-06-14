//Api: https://rapidapi.com/es/Gramzivi/api/covid-19-data/
const axios = require('axios');

var options = {
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/totals',
    headers: {
        'x-rapidapi-key': '3800c51dc0msh15078a490cf2229p129603jsn6fe630f17743',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    }
};

module.exports = {
    axios,
    options
}