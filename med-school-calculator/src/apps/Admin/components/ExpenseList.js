import React from 'react';

import Type from './Type';

import { getTypes } from '../repository';

class ExpenseList extends React.Component {
    state = {
        loading: true,
        types: null
    };

    async componentDidMount() {
        try {
            const types = await getTypes();
            this.setState({ types, loading: false });
        } catch (e) {
            // TODO: show error
        }
    }

    renderTypes = () => {
        const { types } = this.state;

        return types.map(type => <Type key={type.id} type={type} />);
    };

    render() {
        const { loading } = this.state;

        return loading ? <div>loading</div> : this.renderTypes();
    }
}

export default ExpenseList;
