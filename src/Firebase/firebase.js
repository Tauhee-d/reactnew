import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


firebase.initializeApp({
    // apiKey: "AIzaSyABzZcsbR9R5PbjotEJNqIVW7ZcpLxXbAw",
    // authDomain: "hosdashboard.firebaseapp.com",
    // databaseURL: "https://hosdashboard-default-rtdb.firebaseio.com",
    // projectId: "hosdashboard",
    // storageBucket: "hosdashboard.appspot.com",
    // messagingSenderId: "905424640685",
    // appId: "1:905424640685:web:5447e52c441f1b11178424",
    // measurementId: "G-VKT8L80P4Q"


    apiKey: "AIzaSyBUekLmZXlSYHmm2UZP4IHR6e1lTLVI1G0",
    authDomain: "temporary-01-77297.firebaseapp.com",
    projectId: "temporary-01-77297",
    storageBucket: "temporary-01-77297.appspot.com",
    messagingSenderId: "202589686863",
    appId: "1:202589686863:web:d8bce8e9f88d2ca589ee3a"
});

export const db = firebase.firestore();
export const auth = firebase.auth();



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBUekLmZXlSYHmm2UZP4IHR6e1lTLVI1G0",
//   authDomain: "temporary-01-77297.firebaseapp.com",
//   projectId: "temporary-01-77297",
//   storageBucket: "temporary-01-77297.appspot.com",
//   messagingSenderId: "202589686863",
//   appId: "1:202589686863:web:d8bce8e9f88d2ca589ee3a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
