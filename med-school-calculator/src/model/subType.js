import firebase from 'firebase';

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

export const create = ({ typeID, name }) => {
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
