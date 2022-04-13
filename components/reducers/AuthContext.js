import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
        AsyncStorage.setItem("token", JSON.stringify(action.payload.idToken));
        axios.defaults.headers.common = {'Authorization': `Bearer ${action.payload.idToken}`}
  
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.email,
          name: action.payload.familyName,
          givenName: action.payload.givenName,
          token: action.payload.idToken
        };
      case "LOGOUT":
        AsyncStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };
      default:
        return state;
    }
  };