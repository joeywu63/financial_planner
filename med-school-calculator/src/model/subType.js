import firebase from 'firebase';

const SUB_TYPE_COLLECTION = 'subtype';

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
