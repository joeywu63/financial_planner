import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Expense from './Expense';
import SubType from './SubType';
import TypeForm from './TypeForm';

import Button from 'common/Button';

import {
    getTypeExpenses,
    getSubTypes,
    createSubType,
    deleteSubType
} from '../repository';

const TypeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TypeHeader = styled.div`
    font-weight: bold;
    font-size: 40px;
`;

class Type extends React.Component {
    state = {
        loading: true,
        expenses: null,
        subTypes: null,
        isAddingSubType: false,
        isEditingType: false
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

    createTemporarySubType = (id, name) => {
        const { id: typeID } = this.props.type;
        return { id, typeID, name };
    };

    handleCreateSubType = async name => {
        try {
            const { id: typeID } = this.props.type;
            const { subTypes } = this.state;

            const subTypeID = await createSubType({ typeID, name });

            subTypes.push(this.createTemporarySubType(subTypeID, name));
            this.setState({ isAddingSubType: false, subTypes });
        } catch (e) {
            // TODO: error
        }
    };

    handleDeleteSubType = async subTypeID => {
        try {
            const { subTypes } = this.state;

            await deleteSubType({ subTypeID });

            const newSubTypes = subTypes.filter(
                subType => subType.id !== subTypeID
            );
            this.setState({ subTypes: newSubTypes });
        } catch (e) {
            // TODO: error
        }
    };

    handleUpdateType = (id, name) => {
        const { handleUpdateType } = this.props;

        handleUpdateType(id, name);

        this.setState({ isEditingType: false });
    };

    renderHeader = () => {
        const { handleDeleteType } = this.props;
        const { id, name } = this.props.type;
        const { isEditingType } = this.state;

        return isEditingType ? (
            <TypeForm
                handleCancel={this.toggleEditType}
                handleSubmit={name => this.handleUpdateType(id, name)}
                isUpdateForm={true}
            />
        ) : (
            <TypeWrapper>
                <TypeHeader>{name}</TypeHeader>
                <Button text="Delete" onClick={() => handleDeleteType(id)} />
                <Button text="Edit" onClick={this.toggleEditType} />
            </TypeWrapper>
        );
    };

    renderExpenses = () => {
        const { expenses } = this.state;

        return expenses.map(expense => (
            <Expense key={expense.id} expense={expense} />
        ));
    };

    renderSubTypes = () => {
        const { subTypes } = this.state;

        return subTypes.map(subType => (
            <SubType
                key={subType.id}
                subType={subType}
                handleDeleteSubType={this.handleDeleteSubType}
            />
        ));
    };

    toggleAddingSubType = () => {
        const { isAddingSubType } = this.state;
        this.setState({ isAddingSubType: !isAddingSubType });
    };

    toggleEditType = () => {
        const { isEditingType } = this.state;
        this.setState({ isEditingType: !isEditingType });
    };

    render() {
        const { loading, isAddingSubType } = this.state;

        return (
            <>
                {this.renderHeader()}
                {loading ? (
                    <div>loading</div>
                ) : (
                    <>
                        {this.renderExpenses()}
                        {this.renderSubTypes()}
                        {isAddingSubType ? (
                            <TypeForm
                                handleSubmit={this.handleCreateSubType}
                                handleCancel={this.toggleAddingSubType}
                            />
                        ) : (
                            <Button
                                text="Add Sub Type"
                                onClick={this.toggleAddingSubType}
                            />
                        )}
                    </>
                )}
            </>
        );
    }
}

Type.propTypes = {
    type: PropTypes.object.isRequired,
    handleDeleteType: PropTypes.func.isRequired,
    handleUpdateType: PropTypes.func.isRequired
};

export default Type;
