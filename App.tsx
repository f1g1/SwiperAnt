import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeHome from './components/SwipeHome/Index';
import { AuthReducer } from './components/reducers/AuthContext';
import InitialForm from './components/InitialForm/InitialForm';
import { Provider as PaperProvider } from 'react-native-paper';
import { UserHasInitialForm } from './services/InitialFormService';
import AddItem from './components/AddItem/Index';
import { HandleSignalr as ConnectSignalr } from './services/SignalRService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext({}); // added this

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const Tab = createBottomTabNavigator();

function App() {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);
  const [hasForm, sethasForm] = useState(null)

  useEffect(() => {
    // let user = AsyncStorage.getItem("user", x => {
    //   x && console.log("user from Async", JSON.parse(x))
    //   x &&
    //     dispatch({
    //       type: "LOGIN",
    //       payload: JSON.parse(x)
    //     });
    // });


  }, [])

  useEffect(() => {
    if (state.isAuthenticated) {
      //set SignalR connection
      if (!state.hasSignalr) {

        ConnectSignalr(dispatch, state.idToken);
      }

      UserHasInitialForm().then(x => sethasForm(x));


    }

  }, [state])


  return (
    <AuthContext.Provider value={{
      state,
      dispatch
    }}>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            {!state.isAuthenticated ?
              <Stack.Navigator>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ title: 'Login' }}
                />
              </Stack.Navigator>
              :
              <>
                {hasForm != null && !hasForm &&
                  <Stack.Navigator>
                    <Stack.Screen
                      name="InitialForm"
                      component={InitialForm}
                      options={{ title: 'Initial Form' }}
                    />
                  </Stack.Navigator>
                }
                <Tab.Navigator screenOptions={{
                  tabBarHideOnKeyboard: true
                }} initialRouteName='Home'>
                  <Tab.Screen name="Add" component={AddItem} tabBarIcon="home" />
                  <Tab.Screen name="Home" component={SwipeHome} />
                </Tab.Navigator>

              </>
            }

          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>

    </AuthContext.Provider>

  )


}

export default App;
