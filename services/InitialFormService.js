import { BASE_URL } from './const';

const baseUrl = BASE_URL+'api/InitialForm';

export function PostInitialForm(initialForm) {
    var axios = require('axios');
    var config = {
        method: 'post',
        url: baseUrl,
        data: initialForm,
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

export function UserHasInitialForm() {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: baseUrl,
        headers: {}
    };

    return axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return response
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });
}

