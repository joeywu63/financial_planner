import firebase from 'firebase';

const SUBTYPE_COLLECTION = 'expense';
const subtypedb = firebase.firestore().collection(SUBTYPE_COLLECTION);