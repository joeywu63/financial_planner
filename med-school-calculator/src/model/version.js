import firebase from 'firebase';

const VERSION_COLLECTION = 'databaseVersion';

export const get = () => {
    return firebase
        .firestore()
        .collection(VERSION_COLLECTION)
        .doc('version')
        .get()
        .then(collection => {
            return collection.data().version;
        })
        .catch(error => error);
};

export const incrementVersion = () => {
    firebase
        .firestore()
        .collection(VERSION_COLLECTION)
        .doc('version')
        .update({
            version: firebase.firestore.FieldValue.increment(1)
        })
};
