import * as expense from 'model/expense';
import * as type from 'model/type';
import * as subType from 'model/subtype';

export const getTypes = type.get;

export const getTypeExpenses = ({ typeID }) =>
    expense.get({ typeID, subTypeID: null });

export const getSubTypeExpenses = expense.get;

export const getSubTypes = subType.get;

export const createType = type.create;

export const createSubType = subType.create;

export const createExpense = expense.create;

export const deleteType = type.deleteType;

export const deleteSubType = subType.deleteSubType;

export const deleteExpense = expense.deleteExpense;

export const updateType = type.update;

export const updateSubType = subType.update;

export const updateExpense = expense.update;
