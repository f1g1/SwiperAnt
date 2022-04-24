import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import { AuthContext } from '../../App';
import { StyleSheet, View } from 'react-native';
import { GetSignalrConnection } from '../../services/SignalRService';
import { HubConnection } from '@microsoft/signalr';

function SwipeHome() {
  const { state: authState } = React.useContext(AuthContext);




  useEffect(() => {


    if (authState.hasSignalr){
      let connection=GetSignalrConnection()
      console.log("has signalr, add ON Broadcast")
      connection.on("BroadcastMessage", (user, message)=>{
        console.log(user,message);} )
      connection.invoke("TestMethod",'Test')
    
      }

    
   
  }, [authState])



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