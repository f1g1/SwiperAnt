import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PostUserLogin } from '../../services/UserService';



export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      axios.defaults.headers.common = { 'Authorization': `Bearer ${action.payload.idToken}` }
      PostUserLogin(action.payload);
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

      case "CONNECT_SIGNALR":
        console.log("CONNECT_SIGNALR",action.payload)
        return {
          ...state,
          hasSignalr:true,
          signalrConnection:{...action.payload}
        }
   
    default:
      return state;
  }
};