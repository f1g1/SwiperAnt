import { BASE_URL } from './const';

const baseUrl = BASE_URL+"api/Message";

const config = (token) => {
    return { Authorization: `Bearer ${token}` }
};


export function GetConversation(userOwnerId,userRenterId,rentItemId,take=20,skip=0) {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: baseUrl+"/GetConversation",
        params: { userOwnerId,userRenterId, rentItemId }
    };
    
    const promise = axios(config);
    const dataPromise = promise.then((response) => response.data)
    return dataPromise

}

export function PostMessage(userRentItem, text, media,isFromOwner) {
    let messageUi=
    {
        "userRenterId":  userRentItem.userId,
        "UserOwnerId": userRentItem.rentItem.userId,
        "rentItemId": userRentItem.rentItem.id,
        "isFromOwner":isFromOwner,
        "text": text,
        "media": media,
        "dateCreated":  new Date().toISOString(),
        "dateServer": null,
        "dateSentFromServer": null,
        "dateViewed": null
      }
   
    var axios = require('axios');
    var config = {
        method: 'post',
        url: baseUrl,
        data: {...messageUi} ,
    };


    const promise = axios(config);
    const dataPromise = promise.then(() => messageUi)
    return dataPromise

   
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

export function RemoveUserRentItem(id) {
    console.log("delete user rent item with id: ", id)
    var axios = require('axios');
    var config = {
        method: 'Delete',
        url: baseUrl + "/" + id,
        data: {},
        headers: {},
    };
    const promise = axios(config);
    return promise
}