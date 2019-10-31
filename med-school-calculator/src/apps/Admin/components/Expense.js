import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'common/Button';
import TypeForm from 'apps/Admin/components/TypeForm';

const ExpenseWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

class Expense extends React.Component {
    state = {
        loading: true,
        expenses: null,
        isEditingExpense: false
    };

    handleUpdateExpense = (id, name) => {
        const { handleUpdateExpense } = this.props;
        handleUpdateExpense(id, name);
        this.setState({ isEditingExpense: false });
    };

    toggleEditExpense = () => {
        const { isEditingExpense } = this.state;
        this.setState({ isEditingExpense: !isEditingExpense });
    };

    render() {
        const { id, name, cost, description } = this.props.expense;
        //handleDeleteExpense passed in from either Type.js (expenses without a subtype) or SubType.js
        const { handleDeleteExpense } = this.props;
        const { isEditingExpense } = this.state;

        return isEditingExpense ? (
            <TypeForm
                handleCancel={this.toggleEditExpense}
                handleSubmit={name => this.handleUpdateExpense(id, name)}
                isUpdateForm={true}
            />
        ) : (
            <ExpenseWrapper>
                <div>
                    {`${name} (cost: ${cost} ${
                        description ? `description: ${description}` : ''
                    })`}
                </div>
                <Button text="Delete" onClick={() => handleDeleteExpense(id)} />
                <Button text="Edit" onClick={this.toggleEditExpense} />
            </ExpenseWrapper>
        );
    }
}

Expense.propTypes = {
    expense: PropTypes.object.isRequired
};

export default Expense;
