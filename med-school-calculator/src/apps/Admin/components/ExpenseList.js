import React from 'react';

import Type from './Type';
import TypeForm from './TypeForm';

import Button from 'common/Button';

import { getTypes, createType } from '../repository';

class ExpenseList extends React.Component {
    state = {
        loading: true,
        types: null,
        isAddingType: false
    };

    async componentDidMount() {
        try {
            const types = await getTypes();
            this.setState({ types, loading: false });
        } catch (e) {
            // TODO: show error
        }
    }

    createTemporaryType = (id, name) => {
        return { id, name };
    };

    handleCreateType = async name => {
        try {
            const { types } = this.state;

            const typeID = await createType({ name });

            types.push(this.createTemporaryType(typeID, name));
            this.setState({ isAddingType: false, types });
        } catch (e) {
            // TODO: error
        }
    };

    renderTypes = () => {
        const { types } = this.state;

        return types.map(type => <Type key={type.id} type={type} />);
    };

    toggleAddingType = () => {
        const { isAddingType } = this.state;
        this.setState({ isAddingType: !isAddingType });
    };

    render() {
        const { loading, isAddingType } = this.state;

        return loading ? (
            <div>loading</div>
        ) : (
            <>
                {this.renderTypes()}
                {isAddingType ? (
                    <TypeForm
                        handleCreate={this.handleCreateType}
                        handleCancel={this.toggleAddingType}
                    />
                ) : (
                    <Button text="Add Type" onClick={this.toggleAddingType} />
                )}
            </>
        );
    }
}

export default ExpenseList;
