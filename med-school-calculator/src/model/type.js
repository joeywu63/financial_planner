import firebase from 'firebase';

const TYPE_COLLECTION = 'type';

export const get = () => {
    return firebase
        .firestore()
        .collection(TYPE_COLLECTION)
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
    const typeRef = firebase
        .firestore()
        .collection(TYPE_COLLECTION)
        .doc();
    return typeRef
        .set({ name })
        .then(() => typeRef.id)
        .catch(error => error);
};
