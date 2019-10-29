import firebase from 'firebase';

const TYPE_COLLECTION = 'expense';
const typedb = firebase.firestore().collection(TYPE_COLLECTION);