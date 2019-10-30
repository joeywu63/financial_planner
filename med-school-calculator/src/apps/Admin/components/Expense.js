import React from 'react';
import PropTypes from 'prop-types';

class Expense extends React.Component {
    render() {
        const { name } = this.props.expense;

        return <div>{name}</div>;
    }
}

Expense.propTypes = {
    expense: PropTypes.object.isRequired
};

export default Expense;
