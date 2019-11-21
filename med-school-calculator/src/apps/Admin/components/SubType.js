import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from 'styled-css-grid';

import Expense from './Expense';
import TypeForm from './TypeForm';

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
        isEditingSubType: false
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

    createTemporaryExpense = (id, name) => {
        const { id: subTypeID } = this.props.subType;
        return { id, subTypeID, name };
    };

    handleCreateExpense = async name => {
        try {
            const { id: subTypeID } = this.props.subType;
            const { expenses } = this.state;

            const expenseID = await createExpense({ subTypeID, name });

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

    renderExpenses = () => {
        const { expenses } = this.state;

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
            </Grid>
        );
    };

    renderHeader = () => {
        const { handleDeleteSubType } = this.props;
        const { id, name } = this.props.subType;
        const { isEditingSubType } = this.state;

        return isEditingSubType ? (
            <TypeForm
                handleCancel={this.toggleEditSubType}
                handleSubmit={name => this.handleUpdateSubType(id, name)}
                isUpdateForm={true}
            />
        ) : (
            <Hoverable>
                {(isHovering, mouseEnter, mouseLeave) => (
                    <SubTypeWrapper
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                    >
                        <SubTypeHeader>{name}</SubTypeHeader>
                        <StyledIconButton
                            name="trash-alt"
                            onClick={() => handleDeleteSubType(id)}
                            isHovering={isHovering}
                        />
                        <StyledIconButton
                            name="edit"
                            onClick={this.toggleEditSubType}
                            isHovering={isHovering}
                        />
                    </SubTypeWrapper>
                )}
            </Hoverable>
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

    render() {
        const { loading, isAddingExpense } = this.state;

        return (
            <Wrapper>
                {this.renderHeader()}
                {loading ? <div>loading</div> : this.renderExpenses()}
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
