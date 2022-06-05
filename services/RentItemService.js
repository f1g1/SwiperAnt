const baseUrl = 'http://10.0.2.2:5055/api/RentItem';

export function PostRentItem(rentItem) {
    var axios = require('axios');
    var config = {
        method: 'post',
        url: baseUrl,
        data: rentItem,
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


export function PutRentItem(rentItem) {
    var axios = require('axios');
    var config = {
        method: 'put',
        url: baseUrl,
        data: rentItem,
        headers: {}
    };

    const promise = axios(config);
    const dataPromise = promise.then((response) => response.data)
    return dataPromise
}


export function GetMyRentItems() {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: baseUrl + "/my/",
        data: {},
        headers: {}
    };

    const promise = axios(config);
    const dataPromise = promise.then((response) => response.data)
    return dataPromise

}
export function DeleteMyRentItem(id) {
    var axios = require('axios');
    var config = {
        method: 'Delete',
        url: baseUrl + "/my/" + id,
        data: {},
        headers: {}
    };
    const promise = axios(config);
    return promise
}

