const baseUrl = 'http://10.0.2.2:5055/api/Users';

const config = (token) => {
    return { Authorization: `Bearer ${token}` }
};

export function PostUserLogin(user) {

    var axios = require('axios');
    var config = {
        method: 'post',
        url: baseUrl,
        data: user.user,
        headers: {}
    };

    return axios(config)
        .then(function (response) {
            console.log("PostUserLogin:",JSON.stringify(response.data));
            return x
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });


}