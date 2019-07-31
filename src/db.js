import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBbwKvaEuCuqDKnbbxAbqAxWAADllHkEc8',
  authDomain: 'wfac-2020.firebaseapp.com',
  databaseURL: 'https://wfac-2020.firebaseio.com',
  projectId: 'wfac-2020',
  storageBucket: '',
  messagingSenderId: '36698645473',
  appId: '1:36698645473:web:a8d7803e82708054'
}

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
