import React from 'react';
import PropTypes from 'prop-types';

class Expense extends React.Component {
    render() {
        const { name, cost, description, isAlternative } = this.props.expense;
        const altdesc = (isAlternative) ? 'This resource is an alternative.' : 'This resource is not an alternative.'
   
        return (<div>{name} (cost: {cost}. {(description)? ('description: ' + description + '.') : ""} {altdesc})</div>
            );
    }
}

Expense.propTypes = {
    expense: PropTypes.object.isRequired
};

export default Expense;
