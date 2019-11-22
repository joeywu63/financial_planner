import firebase from 'firebase';

const EXPENSE_COLLECTION = 'expense';

export const get = ({ typeID, subTypeID }) => {
    return firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .where('typeID', '==', typeID)
        .where('subtypeID', '==', subTypeID)
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

export const getByID = ({ expenseID }) => {
    return firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc(expenseID)
        .get()
        .then(docRef => {
            return docRef.data();
        })
        .catch(error => error);
};

export const create = ({ typeID, subTypeID, name, description, cost }) => {
    const expenseRef = firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc();
    return expenseRef
        .set({ typeID, subtypeID: subTypeID, name, description, cost })
        .then(() => expenseRef.id)
        .catch(error => error);
};

export const deleteExpense = ({ expenseID }) => {
    const db = firebase.firestore();

    db.collection(EXPENSE_COLLECTION)
        .doc(expenseID)
        .delete()
        .catch(error => {
            console.error(`Error removing expense ${expenseID}: ${error}`);
        });
};

export const update = ({ expenseID, name, description, cost }) => {
    return firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc(expenseID)
        .update({ name, description, cost });
};

export const getBySubtype = ({ subTypeID }) => {
    return firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .where('subtypeID', '==', subTypeID)
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

// get list of all default expenses
export const getAllDefaultExpenses = () => {
    const expenses = [];
    firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .where('isAlternative', '==', false)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                expenses.push(doc.data());
            });
            return expenses;
        })
        .catch(error => error);
};

// get list of all alternative expenses
export const getAllAlternativeExpenses = () => {
    const expenses = [];
    firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .where('isAlternative', '==', true)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                expenses.push(doc.data());
            });
            return expenses;
        })
        .catch(error => error);
};
