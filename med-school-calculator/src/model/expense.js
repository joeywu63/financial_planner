import firebase from 'firebase';

const EXPENSE_COLLECTION = 'expense';
const expensedb = firebase.firestore().collection(EXPENSE_COLLECTION);


// get expense document with this uid
export const getExpenseByID = ({ uid }) => {
    expensedb
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
    expensedb
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
    expensedb
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
    expensedb
        .doc(uid)
        .update({
            [field]: newval
        })
        .catch(error => error);
};
