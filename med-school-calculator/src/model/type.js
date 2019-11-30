import firebase from 'firebase';
import {incrementVersion} from './version'

const TYPE_COLLECTION = 'type';
const SUB_TYPE_COLLECTION = 'subtype';
const EXPENSE_COLLECTION = 'expense';

export const get = () => {
    return firebase
        .firestore()
        .collection(TYPE_COLLECTION)
        .orderBy('order')
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

export const create = ({ name }) => {
    incrementVersion();
    const typeRef = firebase
        .firestore()
        .collection(TYPE_COLLECTION)
        .doc();
    return typeRef
        .set({ name })
        .then(() => typeRef.id)
        .catch(error => error);
};

export const deleteType = ({ typeID }) => {
    incrementVersion();
    const db = firebase.firestore();

    const batch = db.batch();
    // delete type
    const typeRef = db.collection(TYPE_COLLECTION).doc(typeID);
    batch.delete(typeRef);

    // delete subtypes
    return db
        .collection(SUB_TYPE_COLLECTION)
        .where('typeID', '==', typeID)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            return db
                .collection(EXPENSE_COLLECTION)
                .where('typeID', '==', typeID)
                .get();
        })
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            return batch.commit();
        })
        .catch(error => error);
};

export const update = ({ typeID, name }) => {
    incrementVersion();
    return firebase
        .firestore()
        .collection(TYPE_COLLECTION)
        .doc(typeID)
        .update({ name })
        .catch(error => error);
};