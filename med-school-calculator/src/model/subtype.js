import firebase from 'firebase';
import { incrementVersion } from './version';

const SUB_TYPE_COLLECTION = 'subtype';
const EXPENSE_COLLECTION = 'expense';

export const get = ({ typeID }) => {
    return firebase
        .firestore()
        .collection(SUB_TYPE_COLLECTION)
        .where('typeID', '==', typeID)
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

export const getByID = ({ subtypeID }) => {
    return firebase
        .firestore()
        .collection(SUB_TYPE_COLLECTION)
        .doc(subtypeID)
        .get()
        .then(docRef => {
            return docRef.data();
        })
        .catch(error => error);
};

export const getAll = () => {
    return firebase
        .firestore()
        .collection(SUB_TYPE_COLLECTION)
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

export const create = ({ typeID, name }) => {
    incrementVersion();
    const subTypeRef = firebase
        .firestore()
        .collection(SUB_TYPE_COLLECTION)
        .doc();
    return subTypeRef
        .set({ typeID, name })
        .then(() => subTypeRef.id)
        .catch(error => error);
};

export const deleteSubType = ({ subTypeID }) => {
    incrementVersion();
    const db = firebase.firestore();
    const batch = db.batch();
    // delete type
    const subTypeRef = db.collection(SUB_TYPE_COLLECTION).doc(subTypeID);
    batch.delete(subTypeRef);

    // delete subtypes
    return db
        .collection(EXPENSE_COLLECTION)
        .where('subtypeID', '==', subTypeID)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            return batch.commit();
        })
        .catch(error => error);
};

export const update = ({ subTypeID, name }) => {
    incrementVersion();
    return firebase
        .firestore()
        .collection(SUB_TYPE_COLLECTION)
        .doc(subTypeID)
        .update({ name })
        .catch(error => error);
};
