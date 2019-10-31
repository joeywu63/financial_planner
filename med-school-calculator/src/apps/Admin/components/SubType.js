import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Expense from './Expense';

import { getSubTypeExpenses, deleteExpense, updateExpense } from '../repository';

import Button from 'common/Button';
import TypeForm from 'apps/Admin/components/TypeForm';

const SubTypeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SubTypeHeader = styled.div`
    font-weight: bold;
    font-size: 25px;
`;

class SubType extends React.Component {
    state = {
        loading: true,
        expenses: null,
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

    handleDeleteExpense = async expenseID => {
        const { expenses } = this.state;
        try {
            await deleteExpense({ expenseID })
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

        return expenses.map(expense => (
            <Expense key={expense.id} expense={expense} handleDeleteExpense={this.handleDeleteExpense} handleUpdateExpense={this.handleUpdateExpense}/>
        ));
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
            <SubTypeWrapper>
                <SubTypeHeader>{name}</SubTypeHeader>
                <Button text="Delete" onClick={() => handleDeleteSubType(id)} />
                <Button text="Edit" onClick={this.toggleEditSubType} />
            </SubTypeWrapper>
        );
    };

    toggleEditSubType = () => {
        const { isEditingSubType } = this.state;
        this.setState({ isEditingSubType: !isEditingSubType });
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                {this.renderHeader()}
                {loading ? <div>loading</div> : this.renderExpenses()}
            </>
        );
    }
}

SubType.propTypes = {
    subType: PropTypes.object.isRequired,
    handleDeleteSubType: PropTypes.func.isRequired,
    handleUpdateSubType: PropTypes.func.isRequired
};

export default SubType;
