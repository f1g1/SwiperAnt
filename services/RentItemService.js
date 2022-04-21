const baseUrl = 'http://192.168.1.179:5055/api/RentItem';

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