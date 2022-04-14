import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeHome from './components/SwipeHome/Index';
import { AuthReducer } from './components/reducers/AuthContext';
import InitialForm from './components/InitialForm/InitialForm';
import { Provider as PaperProvider } from 'react-native-paper';
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
  useEffect(() => {
    dispatch({ type: "LOAD_FROM_STORAGE"});
  }, [])


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
                <Stack.Screen
                  name="InitialForm"
                  component={InitialForm}
                  options={{ title: 'Initial Form' }}
                />
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
