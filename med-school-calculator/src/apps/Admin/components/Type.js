import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Expense from './Expense';
import SubType from './SubType';
import TypeForm from './TypeForm';

import Button from 'common/Button';

import {
    getTypeExpenses,
    getSubTypes,
    createExpenseUnderType,
    createSubType,
    deleteSubType,
    updateSubType,
    deleteExpense,
    updateExpense
} from '../repository';

const TypeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TypeHeader = styled.div`
    font-weight: bold;
    font-size: 40px;
`;

class Type extends React.Component {
    state = {
        loading: true,
        expenses: null,
        subTypes: null,
        isAddingExpense: false,
        isAddingSubType: false,
        isEditingType: false
    };

    async componentDidMount() {
        try {
            const { id } = this.props.type;

            const expenses = await getTypeExpenses({ typeID: id });
            const subTypes = await getSubTypes({ typeID: id });

            this.setState({ expenses, subTypes, loading: false });
        } catch (e) {
            // TODO: show error
        }
    }

    createTemporaryExpense = (id, name) => {
        const { id: typeID } = this.props.type;
        return { id, typeID, name };
    };

    handleCreateExpense = async name => {
        try {
            const { id: typeID } = this.props.type;
            const { expenses } = this.state;

            const expenseID = await createExpenseUnderType({ typeID, name });

            expenses.push(this.createTemporaryExpense(expenseID, name));
            this.setState({ isAddingExpense: false, expenses });
        } catch (e) {
            // TODO: error
        }
    };

    handleDeleteExpense = async expenseID => {
        const { expenses } = this.state;
        try {
            await deleteExpense({ expenseID });
        } catch (e) {
            // TODO: error
        }
        const newExpenses = expenses.filter(
            expense => expense.id !== expenseID
        );
        this.setState({ expenses: newExpenses });
    };

    handleUpdateExpense = async (expenseID, name) => {
        try {
            const { expenses } = this.state;

            await updateExpense({ expenseID, name });

            const newExpenses = expenses.map(expense => {
                if (expense.id === expenseID) {
                    expense.name = name;
                }
                return expense;
            });
            this.setState({ expenses: newExpenses });
        } catch (e) {
            // TODO: error
        }
    };

    createTemporarySubType = (id, name) => {
        const { id: typeID } = this.props.type;
        return { id, typeID, name };
    };

    handleCreateSubType = async name => {
        try {
            const { id: typeID } = this.props.type;
            const { subTypes } = this.state;

            const subTypeID = await createSubType({ typeID, name });

            subTypes.push(this.createTemporarySubType(subTypeID, name));
            this.setState({ isAddingSubType: false, subTypes });
        } catch (e) {
            // TODO: error
        }
    };

    handleDeleteSubType = async subTypeID => {
        try {
            const { subTypes } = this.state;

            await deleteSubType({ subTypeID });

            const newSubTypes = subTypes.filter(
                subType => subType.id !== subTypeID
            );
            this.setState({ subTypes: newSubTypes });
        } catch (e) {
            // TODO: error
        }
    };

    handleUpdateType = (id, name) => {
        const { handleUpdateType } = this.props;

        handleUpdateType(id, name);

        this.setState({ isEditingType: false });
    };

    handleUpdateSubType = async (subTypeID, name) => {
        try {
            const { subTypes } = this.state;

            await updateSubType({ subTypeID, name });

            const newSubTypes = subTypes.map(subType => {
                if (subType.id === subTypeID) {
                    subType.name = name;
                }
                return subType;
            });
            this.setState({ subTypes: newSubTypes });
        } catch (e) {
            // TODO: error
        }
    };

    renderHeader = () => {
        const { handleDeleteType } = this.props;
        const { id, name } = this.props.type;
        const { isEditingType } = this.state;

        return isEditingType ? (
            <TypeForm
                handleCancel={this.toggleEditType}
                handleSubmit={name => this.handleUpdateType(id, name)}
                isUpdateForm={true}
            />
        ) : (
            <TypeWrapper>
                <TypeHeader>{name}</TypeHeader>
                <Button text="Delete" onClick={() => handleDeleteType(id)} />
                <Button text="Edit" onClick={this.toggleEditType} />
            </TypeWrapper>
        );
    };

    renderExpenses = () => {
        const { expenses } = this.state;

        return expenses.map(expense => (
            <Expense
                key={expense.id}
                expense={expense}
                handleDeleteExpense={this.handleDeleteExpense}
                handleUpdateExpense={this.handleUpdateExpense}
            />
        ));
    };

    renderSubTypes = () => {
        const { subTypes } = this.state;

        return subTypes.map(subType => (
            <SubType
                key={subType.id}
                subType={subType}
                handleDeleteSubType={this.handleDeleteSubType}
                handleUpdateSubType={this.handleUpdateSubType}
            />
        ));
    };

    toggleAddingExpense = () => {
        const { isAddingExpense } = this.state;
        this.setState({ isAddingExpense: !isAddingExpense });
    };

    toggleAddingSubType = () => {
        const { isAddingSubType } = this.state;
        this.setState({ isAddingSubType: !isAddingSubType });
    };

    toggleEditType = () => {
        const { isEditingType } = this.state;
        this.setState({ isEditingType: !isEditingType });
    };

    render() {
        const { loading, isAddingSubType, isAddingExpense } = this.state;

        return (
            <>
                {this.renderHeader()}
                {loading ? (
                    <div>loading</div>
                ) : (
                    <>
                        {this.renderExpenses()}
                        {isAddingExpense ? (
                            <TypeForm
                                handleSubmit={this.handleCreateExpense}
                                handleCancel={this.toggleAddingExpense}
                            />
                        ) : (
                            <Button
                                text="Add Expense"
                                onClick={this.toggleAddingExpense}
                            />
                        )}
                        {this.renderSubTypes()}
                        {isAddingSubType ? (
                            <TypeForm
                                handleSubmit={this.handleCreateSubType}
                                handleCancel={this.toggleAddingSubType}
                            />
                        ) : (
                            <Button
                                text="Add Sub Type"
                                onClick={this.toggleAddingSubType}
                            />
                        )}
                    </>
                )}
            </>
        );
    }
}

Type.propTypes = {
    type: PropTypes.object.isRequired,
    handleDeleteType: PropTypes.func.isRequired,
    handleUpdateType: PropTypes.func.isRequired
};

export default Type;