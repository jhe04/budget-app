import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCRsPSyI6XpHauUk0UyP2C0qcTo9cHRwkM',

  authDomain: 'budget-app-f7c0e.firebaseapp.com',

  databaseURL: 'https://budget-app-f7c0e-default-rtdb.firebaseio.com',

  projectId: 'budget-app-f7c0e',

  storageBucket: 'budget-app-f7c0e.appspot.com',

  messagingSenderId: '1000509112599',

  appId: '1:1000509112599:web:9163f2799d128c9759f752',
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;
