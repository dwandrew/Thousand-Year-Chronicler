import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnlMqH4P7yOSVpjbibyLlYi9uSpGQxytY",
    authDomain: "thousand-year-chronicler.firebaseapp.com",
    databaseURL: "https://thousand-year-chronicler.firebaseio.com",
    projectId: "thousand-year-chronicler",
    storageBucket: "thousand-year-chronicler.appspot.com",
    messagingSenderId: "948630256267",
    appId: "1:948630256267:web:23b1fac5c97d61664e728e",
    measurementId: "G-J2RHQSRM2P"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.firestore().settings({timestampsInSnapshots:true})

  export default firebase