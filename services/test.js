const baseUrl = 'http://192.168.1.179:5055/WeatherForecast';

const config = (token) => {
    return { Authorization: `Bearer ${token}` }
};

export function testtoken(idToken) {

    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'http://192.168.1.179:5055/WeatherForecast',
        data: { "token": idToken },
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });


}
