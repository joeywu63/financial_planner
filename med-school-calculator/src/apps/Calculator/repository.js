import * as expense from 'model/expense';
import * as type from 'model/expense';
import * as subtype from 'model/expense';

export const getAllTypes = () => {
    return type.get();
};

// takes string, returns [{id, data}, ...]
export const getSubtypesByType = ({ typeName }) => {
    const type = getAllTypes().filter(t => t.data.name == typeName);
    try {
        const typeID = type[0].id;
        return subtype.get(typeID);
    } catch (e) {
        console.log('type not found');
    }
};

// takes string, returns [{id, data}, ...]
export const getExpensesBySubtype = ({ subtypeName }) => {
    const subtype = subtype.getAll().filter(st => st.data.name == subtypeName);
    try {
        const subtypeID = subtype[0].id;
        return expense.getBySubtype(subtypeID);
    } catch (e) {
        console.log('subtype not found');
    }
};
