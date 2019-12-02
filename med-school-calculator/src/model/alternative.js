import firebase from 'firebase';
import {incrementVersion} from './version'

const ALTERNATIVES_COLLECTION = 'alternatives';

export const create = ({ expenseID, subTypeID, name, description, cost, url }) => {
    incrementVersion();
    const altRef = firebase
        .firestore()
        .collection(ALTERNATIVES_COLLECTION)
        .doc();
    return altRef
        .set({ expenseID, subtypeID: subTypeID, name, description, cost, url })
        .then(() => altRef.id)
        .catch(error => error);
};

export const deleteAlternative = ({ alternativeID }) => {
    incrementVersion();
    const db = firebase.firestore();

    db.collection(ALTERNATIVES_COLLECTION)
        .doc(alternativeID)
        .delete()
        .catch(error => error);
};

export const getByID = ({ alternativeID }) => {
    return firebase
        .firestore()
        .collection(ALTERNATIVES_COLLECTION)
        .doc(alternativeID)
        .get()
        .then(docRef => {
            return docRef.data();
        })
        .catch(error => error);
};

export const getAlternativesByExpense = ({ expenseID }) => {
    return firebase
        .firestore()
        .collection(ALTERNATIVES_COLLECTION)
        .where('expenseID', '==', expenseID)
        .get()
        .then(collection => {
            const data = [];

            collection.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() });
            });
            return data;
        })
        .catch(error => error);
};

export const getAlternativesForSubtype = ({ subtypeID }) => {
    return firebase
        .firestore()
        .collection(ALTERNATIVES_COLLECTION)
        .where('expenseID', '==', '')
        .where('subtypeID', '==', subtypeID)
        .get()
        .then(collection => {
            const data = [];

            collection.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() });
            });
            return data;
        })
        .catch(error => error);
};

export const update = ({ alternativeID, name, description, url, cost }) => {
    incrementVersion();
    return firebase
        .firestore()
        .collection(ALTERNATIVES_COLLECTION)
        .doc(alternativeID)
        .update({ name, description, url, cost });
};