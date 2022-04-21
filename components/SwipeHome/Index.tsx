import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import { AuthContext } from '../../App';
import { testtoken } from '../../services/test';
import { StyleSheet, View } from 'react-native';
const signalR = require("@microsoft/signalr");

function SwipeHome() {
  const { state: authState } = React.useContext(AuthContext);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.1.179:5055/chatHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => authState.idToken,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Debug)
    .build();

    connection.start().then(function () {
      console.log('Connected!');
  }).catch(function (err) {
      return console.error(err.toString());
  });

  connection.on("BroadcastMessage", (type: string, payload: string) => {
    console.log(type,payload)
  });

  testtoken(authState.token)
  }, [])


  

  // const onrender = () => {
    // 
  // }
  // useEffect(() => {
  //   onrender()
  // }, [])



  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native!
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
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