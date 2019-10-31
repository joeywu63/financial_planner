import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'common/Button';

const ExpenseWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

class Expense extends React.Component {
    render() {
        const { id, name, cost, description } = this.props.expense;
        //handleDeleteExpense passed in from either Type.js (expenses without a subtype) or SubType.js
        const { handleDeleteExpense } = this.props;

        return (
            <ExpenseWrapper>
                <div>
                    {`${name} (cost: ${cost} ${
                        description ? `description: ${description}` : ''
                    })`}
                </div>
                <Button text="Delete" onClick={() => handleDeleteExpense(id)} />
            </ExpenseWrapper>
        );
    }
}

Expense.propTypes = {
    expense: PropTypes.object.isRequired
};

export default Expense;
