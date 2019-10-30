import React from 'react';
import PropTypes from 'prop-types';

import Expense from './Expense';

import { getSubTypeExpenses } from '../repository';

class SubType extends React.Component {
    state = {
        loading: true,
        expenses: null
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

    renderExpenses = () => {
        const { expenses } = this.state;

        return expenses.map(expense => (
            <Expense key={expense.id} expense={expense} />
        ));
    };

    render() {
        const { name } = this.props.subType;
        const { loading } = this.state;

        return (
            <>
                <h2>{name}</h2>
                {loading ? <div>loading</div> : this.renderExpenses()}
            </>
        );
    }
}

SubType.propTypes = {
    subType: PropTypes.object.isRequired
};

export default SubType;
