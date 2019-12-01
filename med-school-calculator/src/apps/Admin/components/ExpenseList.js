import React from 'react';

import Type from './Type';
import TypeForm from './TypeForm';

import Button from 'common/Button';

import { getTypes, createType, deleteType, updateType } from '../repository';
import { errorToast } from 'utils/helpers';

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
            errorToast();
        }
    }

    handleCreateType = async name => {
        try {
            const { types } = this.state;

            const typeID = await createType({ name });

            types.push({ id: typeID, name });
            this.setState({ isAddingType: false, types });
        } catch (e) {
            errorToast();
        }
    };

    handleDeleteType = async typeID => {
        try {
            const { types } = this.state;

            await deleteType({ typeID });

            const newTypes = types.filter(type => type.id !== typeID);
            this.setState({ types: newTypes });
        } catch (e) {
            errorToast();
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
            errorToast();
        }
    };

    renderTypes = () => {
        const { types } = this.state;

        return types.map(type => {
            if (type.name === 'Breakdown') {
                return null;
            }

            return (
                <Type
                    key={type.id}
                    type={type}
                    handleDeleteType={this.handleDeleteType}
                    handleUpdateType={this.handleUpdateType}
                />
            );
        });
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
            <div>
                {this.renderTypes()}
                {isAddingType ? (
                    <TypeForm
                        handleSubmit={this.handleCreateType}
                        handleCancel={this.toggleAddingType}
                    />
                ) : (
                    <Button text="Add Type" onClick={this.toggleAddingType} />
                )}
            </div>
        );
    }
}

export default ExpenseList;
