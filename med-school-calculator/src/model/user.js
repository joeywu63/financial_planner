import firebase from 'firebase';
import { ROLES } from 'utils/constants';

const USER_COLLECTION = 'user';
const userdb = firebase.firestore().collection(USER_COLLECTION);

// creates regular user
export const createUser = ({ uid, email }) => {
    userdb
        .doc(uid)
        .set(
            {
                role: ROLES.user,
                email: email
            },
            { merge: true }
        )
        .catch(error => error);
};

// retrieve user document by uid
export const getUser = ({ uid }) => {
    return userdb
        .doc(uid)
        .get()
        .then(doc => {
            return doc.exists ? doc.data() : 'This user does not exist';
        })
        .catch(error => error);
};
