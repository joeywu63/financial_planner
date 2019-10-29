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
export const getAllDefaultExpenses = async () => {
    const expenses = [];
    await expensedb
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
export const getAllAlternativeExpenses = async () => {
    const expenses = [];
    await expensedb
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

// creates an expense document
export const createExpense = async ({
    name,
    cost,
    typeID,
    subtypeID,
    description,
    url
}) => {
    await expensedb
        .add({
            name: name,
            cost: cost,
            typeID: typeID,
            subtypeID: subtypeID,
            description: description,
            url: url
        })
        .catch(error => error);
};

// update this expense document's field with newval
export const updateExpense = async ({ uid, field, newval }) => {
    await expensedb
        .doc(uid)
        .update({
            [field]: newval
        })
        .catch(error => error);
};
