import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export const AuthReducer = (state, action) => {
  console.log(action.payload)
  switch (action.type) {
    case "LOGIN":
      axios.defaults.headers.common = { 'Authorization': `Bearer ${action.payload.idToken}` }
      return {
        ...state,
        ...action.payload,
        isAuthenticated:true
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