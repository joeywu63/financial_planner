import * as expense from 'model/expense';
import * as type from 'model/type';
import * as subType from 'model/subType';

export const getTypes = type.get;

export const getTypeExpenses = ({ typeID }) =>
    expense.get({ typeID, subTypeID: null });

export const getSubTypeExpenses = expense.get;

export const getSubTypes = subType.get;

export const createType = type.create;

export const createSubType = subType.create;

export const deleteType = type.deleteType;
