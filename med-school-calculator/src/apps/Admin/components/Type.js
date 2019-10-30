import React from 'react';
import PropTypes from 'prop-types';

import Expense from './Expense';
import SubType from './SubType';

import { getTypeExpenses, getSubTypes } from '../repository';

class Type extends React.Component {
    state = {
        loading: true,
        expenses: null,
        subTypes: null
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

    renderExpenses = () => {
        const { expenses } = this.state;

        return expenses.map(expense => <Expense key={expense.id} expense={expense} />);
    };

    renderSubTypes = () => {
        const { subTypes } = this.state;

        return subTypes.map(subType => <SubType key={subType.id} subType={subType} />);
    };

    render() {
        const { name } = this.props.type;
        const { loading } = this.state;

        return loading ? (
            <div>loading</div>
        ) : (
            <>
                <h1>{name}</h1>
                {this.renderExpenses()}
                {this.renderSubTypes()}
            </>
        );
    }
}

Type.propTypes = {
    type: PropTypes.object.isRequired
};

export default Type;
