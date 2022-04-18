import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import { AuthContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
  const { dispatch } = React.useContext(AuthContext);

  // Set an initializing state while Firebase connects
  GoogleSignin.configure({ webClientId: "826246121192-eklnj2duuegde9i28t5nq9keiunms7iq.apps.googleusercontent.com" });


  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      await auth().signInWithCredential(googleCredential);
      let idToken = await auth().currentUser?.getIdToken();
      let timestamp = new Date(new Date().getTime() - 60000);
      dispatch({
        type: "LOGIN",
        payload: { ...userInfo,timestamp, idToken }
      })
      await AsyncStorage.setItem("user", JSON.stringify({ ...userInfo, timestamp }));
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 60 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
}

export default Login;
