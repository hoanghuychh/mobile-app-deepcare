import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyBjzKEzQeysjuctooWTr8aUX_6WlVOS_6Q",
    authDomain: "amcoming-fe643.firebaseapp.com",
    databaseURL: "https://amcoming-fe643.firebaseio.com",
    projectId: "amcoming-fe643",
    storageBucket: "amcoming-fe643.appspot.com",
    messagingSenderId: "120623381791"
};
firebase.initializeApp(config);


export default firebase;