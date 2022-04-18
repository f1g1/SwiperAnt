import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeHome from './components/SwipeHome/Index';
import { AuthReducer } from './components/reducers/AuthContext';
import InitialForm from './components/InitialForm/InitialForm';
import { Provider as PaperProvider } from 'react-native-paper';
import { UserHasInitialForm } from './services/InitialFormService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext({}); // added this

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};


function App() {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);
  const [hasForm, sethasForm] = useState(false) 

  useEffect(() => {
    let user = AsyncStorage.getItem("user",x=>{
     x && console.log("user from Async",JSON.parse(x))
      x&&
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(x)
      });
    });

  }, [])

  useEffect(() => {
    if (state.isAuthenticated){
      UserHasInitialForm().then(x=>sethasForm(x));
    }

  }, [state])


  return (
    <AuthContext.Provider value={{
      state,
      dispatch
    }}>
      <PaperProvider>

        <NavigationContainer>
          <Stack.Navigator>
            {!state.isAuthenticated ?
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Login' }}
              />
              :
              <>
              {!hasForm &&
                <Stack.Screen
                  name="InitialForm"
                  component={InitialForm}
                  options={{ title: 'Initial Form' }}
                />}
                <Stack.Screen
                  name="Home"
                  component={SwipeHome}
                  options={{ title: 'Home' }}
                />

              </>
            }

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>

    </AuthContext.Provider>

  )
}

export default App;
