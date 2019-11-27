import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell, Grid } from 'styled-css-grid';

import Expense from './Expense';
import TypeForm from './TypeForm';
import ExpenseForm from './ExpenseForm';
import DeleteModal from 'common/DeleteModal';

import {
    getSubTypeExpenses,
    deleteExpense,
    updateExpense,
    createExpense
} from '../repository';

import Button from 'common/Button';
import Hoverable from 'common/Hoverable';
import IconButton from 'common/IconButton';

const Wrapper = styled.div`
    padding-left: 40px;
`;

const SubTypeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SubTypeHeader = styled.div`
    font-weight: bold;
    font-size: 25px;
`;

const StyledIconButton = styled(IconButton)`
    visibility: ${props => (props.isHovering ? 'visible' : 'hidden')};
`;

class SubType extends React.Component {
    state = {
        loading: true,
        expenses: null,
        isAddingExpense: false,
        isEditingSubType: false,
        isModalOpen: false
    };

    async componentDidMount() {
        try {
            const { id, typeID } = this.props.subType;

            const expenses = await getSubTypeExpenses({
                typeID,
                subTypeID: id
            });

            this.setState({ expenses, loading: false });
        } catch (e) {
            // TODO: show error
        }
    }

    handleUpdateSubType = (id, name) => {
        const { handleUpdateSubType } = this.props;

        handleUpdateSubType(id, name);

        this.setState({ isEditingSubType: false });
    };

    createTemporaryExpense = (
        id,
        typeID,
        subTypeID,
        name,
        description,
        cost
    ) => {
        return {
            id,
            typeID,
            subTypeID,
            name,
            description,
            cost
        };
    };

    handleCreateExpense = async (name, description, cost) => {
        try {
            const { id: subTypeID, typeID } = this.props.subType;
            const { expenses } = this.state;

            const expenseID = await createExpense({
                typeID,
                subTypeID,
                name,
                description,
                cost
            });

            expenses.push(
                this.createTemporaryExpense(
                    expenseID,
                    typeID,
                    subTypeID,
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

    renderHeader = () => {
        const { handleDeleteSubType } = this.props;
        const { id, name } = this.props.subType;
        const { isEditingSubType, isModalOpen } = this.state;

        return isEditingSubType ? (
            <TypeForm
                handleCancel={this.toggleEditSubType}
                handleSubmit={name => this.handleUpdateSubType(id, name)}
                name={name}
            />
        ) : (
            <>
                <DeleteModal
                    isOpen={isModalOpen}
                    onRequestClose={this.toggleModal}
                    onDelete={() => handleDeleteSubType(id)}
                    deleteConfirmationName="DELETE"
                />
                <Hoverable>
                    {(isHovering, mouseEnter, mouseLeave) => (
                        <SubTypeWrapper
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                        >
                            <SubTypeHeader>{name}</SubTypeHeader>
                            <StyledIconButton
                                name="pen"
                                onClick={this.toggleEditSubType}
                                isHovering={isHovering}
                            />
                            <StyledIconButton
                                name="trash-alt"
                                onClick={this.toggleModal}
                                isHovering={isHovering}
                            />
                        </SubTypeWrapper>
                    )}
                </Hoverable>
            </>
        );
    };

    toggleEditSubType = () => {
        const { isEditingSubType } = this.state;
        this.setState({ isEditingSubType: !isEditingSubType });
    };

    toggleAddingExpense = () => {
        const { isAddingExpense } = this.state;
        this.setState({ isAddingExpense: !isAddingExpense });
    };

    toggleModal = () => {
        const { isModalOpen } = this.state;

        this.setState({ isModalOpen: !isModalOpen });
    };

    render() {
        const { loading } = this.state;

        return (
            <Wrapper>
                {this.renderHeader()}
                {loading ? <div>loading</div> : this.renderExpenses()}
            </Wrapper>
        );
    }
}

SubType.propTypes = {
    subType: PropTypes.object.isRequired,
    handleDeleteSubType: PropTypes.func.isRequired,
    handleUpdateSubType: PropTypes.func.isRequired
};

export default SubType;
