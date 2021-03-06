import * as expense from 'model/expense';
import * as type from 'model/type';
import * as subtype from 'model/subtype';
import * as alternative from 'model/alternative';
import * as version from 'model/version';
import { updateProgress, updateVersion } from 'model/user';
import { getCurrentUser } from 'utils/currentUser';
import { auth } from 'firebase';

export const getAllTypes = type.get;

export const getSubtypesByType = subtype.get;

export const getExpensesBySubtype = expense.getBySubtype;

export const getAlternative = alternative.getByID;

export const getAlternativesByExpense = alternative.getAlternativesByExpense;

export const getAlternativesForSubtype = alternative.getAlternativesForSubtype;

export const getUser = getCurrentUser;

export const getExpense = expense.getByID;

export const getSubtype = subtype.getByID;

export const getDatabaseVersion = version.get;

export const saveProgress = async checked => {
    const uid = auth().currentUser.uid;
    updateProgress(uid, checked);
};

export const updateVersionForUser = updateVersion;

export const getTypeExpenses = ({ typeID }) =>
    expense.get({ typeID, subTypeID: null });
