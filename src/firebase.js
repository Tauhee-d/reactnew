import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import config from './config.js'


firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.database()

export {auth,db}