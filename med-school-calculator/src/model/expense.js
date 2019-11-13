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

export const create = ({ subTypeID, name }) => {
    const expenseRef = firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc();
    return expenseRef
        .set({ subTypeID, name })
        .then(() => expenseRef.id)
        .catch(error => error);
};

export const createUnderType = ({ typeID, name }) => {
    const expenseRef = firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc();
    return expenseRef
        .set({ typeID, name })
        .then(() => expenseRef.id)
        .catch(error => error);
};

export const deleteExpense = ({ expenseID }) => {
    const db = firebase.firestore();

    db.collection(EXPENSE_COLLECTION)
        .doc(expenseID)
        .delete()
        .then(() => {
            console.log(`Expense ${expenseID} successfully deleted`);
        })
        .catch(error => {
            console.error(`Error removing expense ${expenseID}: ${error}`);
        });
};

export const update = ({ expenseID, name }) => {
    return firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc(expenseID)
        .update({ name })
export const getBySubtype = ({ subTypeID }) => {
    console.log(subTypeID)
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
        })
        .catch(error => error);
    return expenses;
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
        })
        .catch(error => error);
    return expenses;
};


// update this expense document's field with newval
export const updateExpense = ({ uid, field, newval }) => {
    firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc(uid)
        .update({
            [field]: newval
        })
        .catch(error => error);
};
