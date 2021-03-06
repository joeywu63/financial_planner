import firebase from 'firebase';
import { ROLES } from 'utils/constants';

const USER_COLLECTION = 'user';

export const create = ({ uid, email }) => {
    firebase
        .firestore()
        .collection(USER_COLLECTION)
        .doc(uid)
        .set({
            role: ROLES.user,
            email,
            version: 0
        })
        .catch(error => error);
};

export const get = ({ uid }) => {
    return firebase
        .firestore()
        .collection(USER_COLLECTION)
        .doc(uid)
        .get()
        .then(doc => {
            return doc.exists ? doc.data() : 'This user does not exist';
        })
        .catch(error => error);
};

export const updateVersion = (uid, newVersion) => {
    firebase
        .firestore()
        .collection(USER_COLLECTION)
        .doc(uid)
        .set(
            {
                version: newVersion
            },
            { merge: true }
        )
        .catch(err => alert(err));
};

export const updateProgress = (uid, expenses) => {
    firebase
        .firestore()
        .collection(USER_COLLECTION)
        .doc(uid)
        .set(
            {
                progress: Array.from(expenses)
            },
            { merge: true }
        )
        .catch(err => alert(err));
};
