import React, { useEffect, useState } from 'react'
import { AuthContext } from '../../App';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { GetSignalrConnection } from '../../services/SignalRService';
import ItemCard from '../Card/Index';

const axios = require('axios')


const item = { "title": "Apartament 2 camere decomandat Central", "link": "https://www.imobiliare.ro/inchirieri-apartamente/cluj-napoca/central/apartament-de-inchiriat-2-camere-X54N0017J", "location": "Cluj-Napoca", "neighborhood": "zona Central", "rooms": "2 camere", "size": "55 mp utili", "level": "Etaj 2/4", "type": "Decomandat", "price": "350", "images": ["https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982148.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982160.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982156.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982154.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982152.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982136.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982138.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982142.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982166.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982162.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982158.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982164.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982140.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982144.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982146.jpg", "https://img3.imonet.ro/XBSG/BSG00KJNOP4/garsoniera-de-inchiriat-cluj-napoca-ultracentral-152982150.jpg"] }

function SwipeHome() {
  const { state: authState } = React.useContext(AuthContext);
  const [rentItems, setRentItems] = useState()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (authState.hasSignalr) {
      let connection = GetSignalrConnection()
      console.log("has signalr, add ON Broadcast")
      connection.on("BroadcastMessage", (user, message) => {
        console.log(user, message);
      })
      connection.invoke("TestMethod", 'Test')

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
    console.log("triggered next")
    setIndex(index + 1)
  }

  return (
    <>
      {rentItems && rentItems[index] &&
        <ItemCard key={index} item={rentItems[index]} triggerNext={triggerNext} />}
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