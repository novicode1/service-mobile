import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCUIIL4_Pw8BVY6TEIF2cm6XZDKMDhNZjU',
    authDomain: 'service-mobile-21c17.firebaseapp.com',
    databaseURL: 'https://service-mobile-21c17.firebaseio.com',
    projectId: 'service-mobile-21c17',
    storageBucket: 'service-mobile-21c17.appspot.com',
    messagingSenderId: '1073078299771'
  })
}

export const DB = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()

export default firebase
