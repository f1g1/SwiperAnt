import React, { useEffect, useState } from 'react'
import { AuthContext } from '../../App';
import { StyleSheet } from 'react-native';
import { GetSignalrConnection } from '../../services/SignalRService';
import ItemCard from '../Card/Index';
import notifee, { AndroidGroupAlertBehavior } from '@notifee/react-native';
import { Button } from 'react-native-paper';

const axios = require('axios')


const item = { "title": "Apartament 2 camere decomandat Central", "link": "https://www.imobiliare.ro/inchirieri-apartamente/cluj-napoca/central/apartament-de-inchiriat-2-camere-X54N0017J", "location": "Cluj-Napoca", "neighborhood": "zona Central", "rooms": "2 camere", "size": "55 mp utili", "level": "Etaj 2/4", "type": "Decomandat", "price": "350", "images": ["https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982148.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982160.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982156.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982154.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982152.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982136.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982138.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982142.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982166.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982162.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982158.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982164.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982140.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982144.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982146.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982150.jpg"] }

function SwipeHome() {
  const { state: authState } = React.useContext(AuthContext);
  const [rentItems, setRentItems] = useState()
  const [index, setIndex] = useState(0)
  const [firstNotification, setFirstNotification] = useState(true)

  async function onDisplayNotification(message) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
  
// This won't actually trigger a new group because the `id` field is the same.
// We could however, update the text of the group summary
await notifee.displayNotification({
  id: "group", // important
  title: "Group Chat",
  android: {
    channelId: "default",
    groupSummary: true,
    groupId: "123"
  }
});

// This notification would be created from the FCM payload: 
await notifee.displayNotification({
  title: "Message 3",
  android: {
    channelId: "default",
    groupId: "123"
  }
});
  }



  useEffect(() => {
    if (authState.hasSignalr) {
      let connection = GetSignalrConnection()
      connection.on("ReceiveMessage", (message) => {
        console.log("MESSAGE RECEIVED SIGNALR", message);
        onDisplayNotification(message)

      })
    }
  }, [authState])


  function fetchData() {
    const baseUrl = 'http://10.0.2.2:5055/api/RentItem';
    var config = {
      method: 'get',
      url: baseUrl + "/my/",
      data: {},
      headers: {}
    };

    axios(config).then((x) => {
      setRentItems(x.data)
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  const triggerNext = () => {
    setIndex(index + 1)
  }

  return (
    <>
      {rentItems && rentItems[index] &&
        <ItemCard key={index} item={rentItems[index]} triggerNext={triggerNext} showBottomBar={true} />}
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default SwipeHome