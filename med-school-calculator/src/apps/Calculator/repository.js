import * as expense from 'model/expense';
import * as type from 'model/type';
import * as subtype from 'model/subtype';
import * as alternative from 'model/alternative';
import { updateProgress } from 'model/user';
import { getCurrentUser } from 'utils/currentUser'
import { auth } from 'firebase';

export const getAllTypes = type.get;

export const getSubtypesByType = subtype.get;

export const getExpensesBySubtype = expense.getBySubtype;

export const getAlternativesByExpense = alternative.getAlternativesByExpense;

export const getUser = getCurrentUser;

export const getExpense = expense.getByID;

export const getSubtype = subtype.getByID;

export const saveProgress = async checked => {
    const uid = auth().currentUser.uid;
    updateProgress(uid, checked);
};
