import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCi22sxHXCpQo8ACH6YJCKeB2NA45j-EGk',
  authDomain: 'crwn-clothing-5e27b.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-5e27b.firebaseio.com',
  projectId: 'crwn-clothing-5e27b',
  storageBucket: 'crwn-clothing-5e27b.appspot.com',
  messagingSenderId: '105302992958',
  appId: '1:105302992958:web:c9aeb60093d1653e74096f',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
