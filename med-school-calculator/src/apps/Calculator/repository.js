import * as expense from 'model/expense';
import * as type from 'model/type';
import * as subtype from 'model/subtype';

export const getAllTypes = () => {
    return type.get();
};

// takes string, returns [{id, data}, ...]
export const getSubtypesByType = async (typeName) => {
    const allTypes = await getAllTypes();
    const type = allTypes.filter(t => t.name === typeName);
    try {
        const typeID = type[0].id;
        const subtypes = await subtype.get({typeID: typeID});
        return subtypes;
    } catch (e) {
        console.log("type not found");
    }
    // const type = getAllTypes()   .filter(t => {t.data.name == typeName});
    // try {
    //     const typeID = type[0].id;
    //     return subtype.get(typeID);
    // } catch (e) {
    //     console.log('type not found');
    // }
};

// takes string, returns [{id, data}, ...]
export const getExpensesBySubtype = async ({ subtypeName }) => {
    const allSubtypes = await subtype.getAll();
    const type = allSubtypes.filter(st => st.name === subtypeName);
    try {
        const subTypeID = type[0].id;
        const expenses = await expense.getBySubtype({subTypeID: subTypeID});
        return expenses;
    } catch (e) {
        console.log(e);
    }


    // const subtype = subtype.getAll().filter(st => st.data.name == subtypeName);
    // try {
    //     const subtypeID = subtype[0].id;
    //     return expense.getBySubtype(subtypeID);
    // } catch (e) {
    //     console.log('subtype not found');
    // }
};
