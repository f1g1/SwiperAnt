import { BASE_URL } from './const';

const baseUrl = BASE_URL+'api/UserRentItem';

const config = (token) => {
    return { Authorization: `Bearer ${token}` }
};

export function PostUserRentItem(userRentItem) {

    var axios = require('axios');
    var config = {
        method: 'post',
        url: baseUrl,
        data: userRentItem,
        headers: {}
    };

    return axios(config)
        .then(function (response) {
            console.log("PostUserLogin:", JSON.stringify(response.data));
            return x
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });

}


//todo add GetMyUSerREntITem
export function GetLikedUserRentItems(take, skip) {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: baseUrl + "/my",
        data: {},
        headers: {},
        params: { take, skip }

    };
    const promise = axios(config);
    const dataPromise = promise.then((response) => response.data)
    return dataPromise

}

export function  RemoveUserRentItem(id) {
    console.log("delete user rent item with id: ", id)
    var axios = require('axios');
    var config = {
        method: 'Delete',
        url: baseUrl +"/"+id,
        data: {},
        headers: {},
    };
    const promise = axios(config);
    return promise
}