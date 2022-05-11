
const signalR = require("@microsoft/signalr");


let signalrConnection;

export function HandleSignalr(dispatch,idToken) {
    signalrConnection = new signalR.HubConnectionBuilder()
        .withUrl("http://10.0.2.2:5055/chatHub", {
          accessTokenFactory: () => idToken,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Warning)
        .build();

      signalrConnection.start().then(() => {
        dispatch({ type: "CONNECT_SIGNALR"});

      }).catch(function (err) {
        return console.error(err.toString());
      });
  }
  export function GetSignalrConnection(){
      return signalrConnection;
  }

  