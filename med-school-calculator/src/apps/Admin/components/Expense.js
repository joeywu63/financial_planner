import React from 'react';
import PropTypes from 'prop-types';

class Expense extends React.Component {
    render() {
        const { name, cost, description, isAlternative } = this.props.expense;

        return (
            <div>
                {`${name} (cost: ${cost} ${
                    description ? `description: ${description}` : ''
                })`}
            </div>
        );
    }
}

Expense.propTypes = {
    expense: PropTypes.object.isRequired
};

export default Expense;
