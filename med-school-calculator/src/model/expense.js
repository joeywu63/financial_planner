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

export const deleteExpense = ({ expenseID }) => {
    const db = firebase.firestore();

    db.collection(EXPENSE_COLLECTION).doc(expenseID).delete().then(() => {
        console.log(`Expense ${expenseID} successfully deleted`);
    }).catch(error => {
        console.error(`Error removing expense ${expenseID}: ${error}`);
    });  
};
