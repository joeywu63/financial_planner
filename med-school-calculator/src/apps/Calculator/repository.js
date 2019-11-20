import * as expense from 'model/expense';
import * as type from 'model/type';
import * as subtype from 'model/subtype';

export const getAllTypes = type.get;

// takes string, returns [{id, data}, ...]
// TODO: Move to /model
export const getSubtypesByType = async typeId => {
    try {
        const allTypes = await getAllTypes();
        const type = allTypes.filter(t => t.id === typeId);
        const typeID = type[0].id;
        const subtypes = await subtype.get({ typeID: typeID });
        return subtypes;
    } catch (e) {
        console.log('type not found');
    }
};

// takes string, returns [{id, data}, ...]
export const getExpensesBySubtype = async (subtypeID) => {
    try {
        const allSubtypes = await subtype.getAll();
        const type = allSubtypes.filter(st => st.id === subtypeID);
        const subTypeID = type[0].id;
        const expenses = await expense.getBySubtype({ subTypeID: subTypeID });
        return expenses;
    } catch (e) {
        console.log(e);
    }
};
