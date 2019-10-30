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
            email
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