import firebase from 'firebase'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'wfac-2020' })
  .firestore()

// Export types that exists in Firestore
export const { TimeStamp, GeoPoint } = firebase.firestore

// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyBbwKvaEuCuqDKnbbxAbqAxWAADllHkEc8",
//   authDomain: "wfac-2020.firebaseapp.com",
//   databaseURL: "https://wfac-2020.firebaseio.com",
//   projectId: "wfac-2020",
//   storageBucket: "",
//   messagingSenderId: "36698645473",
//   appId: "1:36698645473:web:a8d7803e82708054"
// }
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig)
