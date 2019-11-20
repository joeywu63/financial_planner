import firebase from 'firebase';

const ALTERNATIVES_COLLECTION = 'alternatives';

export const getAlternativesByExpense = ({ expenseID }) => {
    return firebase
        .firestore()
        .collection(ALTERNATIVES_COLLECTION)
        .where('expenseID', '==', expenseID)
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