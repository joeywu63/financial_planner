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
