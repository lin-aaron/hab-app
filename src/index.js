import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBxV30w-Ko5I7UvlSsCebNTePFNe7Tkvqg",
    authDomain: "stac-hab-website.firebaseapp.com",
    databaseURL: "https://stac-hab-website.firebaseio.com",
    projectId: "stac-hab-website",
    storageBucket: "stac-hab-website.appspot.com",
    messagingSenderId: "860073272982",
    appId: "1:860073272982:web:72c48be4f4d02127fcc4b7",
    measurementId: "G-HQQ5VJRHMY"
  };

  firebase.initializeApp(firebaseConfig);
  //var db = firebase.firestore();
  //const firebase = require("firebase");
// Required for side-effects
  require("firebase/firestore");

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

var db = firebase.firestore();
var docRef = db.collection("HAB IV Test Flight 1").doc("19-11-11 10:41:50");

docRef.get().then(function(doc) {
  if (doc.exists) {
      //flight_info.append(doc.data());
      console.log("Document data:", doc.data());

      document.getElementById("altitude_data").innerHTML = "Altitude: " + doc.data().altitude;
      document.getElementById("heading_data").innerHTML = "Heading: " + doc.data().heading;
      // var object = InfoPanel.refs.flight_data;
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});
