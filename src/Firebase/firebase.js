import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


firebase.initializeApp({
    apiKey: "AIzaSyABzZcsbR9R5PbjotEJNqIVW7ZcpLxXbAw",
    authDomain: "hosdashboard.firebaseapp.com",
    databaseURL: "https://hosdashboard-default-rtdb.firebaseio.com",
    projectId: "hosdashboard",
    storageBucket: "hosdashboard.appspot.com",
    messagingSenderId: "905424640685",
    appId: "1:905424640685:web:5447e52c441f1b11178424",
    measurementId: "G-VKT8L80P4Q"});

export const db = firebase.firestore();
export const auth = firebase.auth();
