import * as expense from 'model/expense';
import * as type from 'model/type';
import * as subtype from 'model/subtype';
import * as alternative from 'model/alternative';

export const getAllTypes = type.get;

// takes string, returns [{id, data}, ...]
// TODO: Move to /model
export const getSubtypesByType = async typeName => {
    try {
        const allTypes = await getAllTypes();
        const type = allTypes.filter(t => t.name === typeName);
        const typeID = type[0].id;
        const subtypes = await subtype.get({ typeID: typeID });
        return subtypes;
    } catch (e) {
        console.log('type not found');
    }
};

// takes string, returns [{id, data}, ...]
export const getExpensesBySubtype = async ({ subtypeName }) => {
    try {
        const allSubtypes = await subtype.getAll();
        const type = allSubtypes.filter(st => st.name === subtypeName);
        const subTypeID = type[0].id;
        const expenses = await expense.getBySubtype({ subTypeID: subTypeID });
        return expenses;
    } catch (e) {
        console.log(e);
    }
};

export const getAlternativesByExpense = alternative.getAlternativesByExpense
