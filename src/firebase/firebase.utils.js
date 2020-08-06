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

export const createUserProfileDocument = async (userAuth, data) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...data,
      });
    } catch (err) {
      console.log(`Error creating user: ${err.message}`);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
