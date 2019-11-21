import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

import Expense from './Expense';
import SubType from './SubType';
import TypeForm from './TypeForm';
import ExpenseForm from './ExpenseForm';

import Button from 'common/Button';
import IconButton from 'common/IconButton';
import Hoverable from 'common/Hoverable';

import {
    getTypeExpenses,
    getSubTypes,
    createSubType,
    deleteSubType,
    updateSubType,
    createExpense,
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

const StyledIconButton = styled(IconButton)`
    visibility: ${props => (props.isHovering ? 'visible' : 'hidden')};
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

    createTemporaryExpense = (id, typeID, name, description, cost) => {
        return {
            id,
            typeID,
            subTypeID: null,
            name,
            description,
            cost
        };
    };

    handleCreateExpense = async (name, description, cost) => {
        try {
            const { id: typeID } = this.props.type;
            const { expenses } = this.state;

            const expenseID = await createExpense({
                typeID,
                subTypeID: null,
                name,
                description,
                cost
            });

            expenses.push(
                this.createTemporaryExpense(
                    expenseID,
                    typeID,
                    name,
                    description,
                    cost
                )
            );
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

    handleUpdateExpense = async (expenseID, name, description, cost) => {
        try {
            const { expenses } = this.state;

            await updateExpense({ expenseID, name, description, cost });

            const newExpenses = expenses.map(expense => {
                if (expense.id === expenseID) {
                    expense = {
                        ...expense,
                        name,
                        description,
                        cost
                    };
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
                name={name}
            />
        ) : (
            <Hoverable>
                {(isHovering, mouseEnter, mouseLeave) => (
                    <TypeWrapper
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    >
                        <TypeHeader>{name}</TypeHeader>
                        <StyledIconButton
                            name="pen"
                            onClick={this.toggleEditType}
                            isHovering={isHovering}
                        />
                        <StyledIconButton
                            name="trash-alt"
                            onClick={() => handleDeleteType(id)}
                            isHovering={isHovering}
                        />
                    </TypeWrapper>
                )}
            </Hoverable>
        );
    };

    renderExpenses = () => {
        const { expenses, isAddingExpense } = this.state;

        return (
            <Grid columns={10} gap="2px" alignContent="center">
                {expenses.map(expense => (
                    <Expense
                        key={expense.id}
                        expense={expense}
                        handleDeleteExpense={this.handleDeleteExpense}
                        handleUpdateExpense={this.handleUpdateExpense}
                    />
                ))}
                {isAddingExpense ? (
                    <ExpenseForm
                        handleSubmit={this.handleCreateExpense}
                        handleCancel={this.toggleAddingExpense}
                    />
                ) : (
                    <Cell width={2}>
                        <Button
                            text="Add Expense"
                            onClick={this.toggleAddingExpense}
                        />
                    </Cell>
                )}
            </Grid>
        );
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
        const { loading, isAddingSubType } = this.state;

        return (
            <>
                {this.renderHeader()}
                {loading ? (
                    <div>loading</div>
                ) : (
                    <>
                        {this.renderExpenses()}
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
