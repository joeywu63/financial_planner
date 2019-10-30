import firebase from 'firebase';

const EXPENSE_COLLECTION = 'expense';

// get expense document with this uid
export const getExpenseByID = ({ uid }) => {
    firebase
        .firestore()
        .collection(EXPENSE_COLLECTION)
        .doc(uid)
        .get()
        .then(doc => {
            return doc.exists ? doc.data() : 'This expense does not exist';
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
