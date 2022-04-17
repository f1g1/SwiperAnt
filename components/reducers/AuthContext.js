import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PostUserLogin } from '../../services/UserService';



export const AuthReducer = (state, action) => {
  let timestamp = new Date(new Date().getTime() - 60000);
  console.log(action.payload)
  switch (action.type) {
    case "LOGIN":
      AsyncStorage.setItem("user", JSON.stringify({ ...action.payload, timestamp }));
      axios.defaults.headers.common = { 'Authorization': `Bearer ${action.payload.idToken}` }
      console.log("hasInitialForm",hasInitialForm)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.email,
        name: action.payload.familyName,
        givenName: action.payload.givenName,
        token: action.payload.idToken,
        authTime: timestamp
      };
    case "LOGOUT":
      AsyncStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case "LOAD_FROM_STORAGE": {
      let user = AsyncStorage.getItem("user").then(x => JSON.parse(x));
      axios.defaults.headers.common = { 'Authorization': `Bearer ${user?.idToken}` }
      return user;
    }
    default:
      return state;
  }
};