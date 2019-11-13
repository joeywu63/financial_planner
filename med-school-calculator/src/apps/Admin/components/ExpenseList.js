import React from 'react';

import Type from './Type';
import TypeForm from './TypeForm';

import Button from 'common/Button';

import { getTypes, createType, deleteType, updateType } from '../repository';

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

    handleCreateType = async name => {
        try {
            const { types } = this.state;

            const typeID = await createType({ name });

            types.push({id: typeID, name});
            this.setState({ isAddingType: false, types });
        } catch (e) {
            // TODO: error
        }
    };

    handleDeleteType = async typeID => {
        try {
            const { types } = this.state;

            await deleteType({ typeID });

            const newTypes = types.filter(type => type.id !== typeID);
            this.setState({ types: newTypes });
        } catch (e) {
            // TODO: error
        }
    };

    handleUpdateType = async (typeID, name) => {
        try {
            const { types } = this.state;

            await updateType({ typeID, name });

            const newTypes = types.map(type => {
                if (type.id === typeID) {
                    type.name = name;
                }
                return type;
            });
            this.setState({ types: newTypes });
        } catch (e) {
            // TODO: error
        }
    };

    renderTypes = () => {
        const { types } = this.state;

        return types.map(type => (
            <Type
                key={type.id}
                type={type}
                handleDeleteType={this.handleDeleteType}
                handleUpdateType={this.handleUpdateType}
            />
        ));
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
                        handleSubmit={this.handleCreateType}
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