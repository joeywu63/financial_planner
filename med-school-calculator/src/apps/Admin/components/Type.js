import React from 'react';
import PropTypes from 'prop-types';

import Expense from './Expense';
import SubType from './SubType';
import TypeForm from './TypeForm';

import Button from 'common/Button';

import { getTypeExpenses, getSubTypes, createSubType } from '../repository';

class Type extends React.Component {
    state = {
        loading: true,
        expenses: null,
        subTypes: null,
        isAddingSubType: false
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

    renderExpenses = () => {
        const { expenses } = this.state;

        return expenses.map(expense => (
            <Expense key={expense.id} expense={expense} />
        ));
    };

    renderSubTypes = () => {
        const { subTypes } = this.state;

        return subTypes.map(subType => (
            <SubType key={subType.id} subType={subType} />
        ));
    };

    toggleAddingSubType = () => {
        const { isAddingSubType } = this.state;
        this.setState({ isAddingSubType: !isAddingSubType });
    };

    render() {
        const { name } = this.props.type;
        const { loading, isAddingSubType } = this.state;

        return (
            <>
                <h1>{name}</h1>
                {loading ? (
                    <div>loading</div>
                ) : (
                    <>
                        {this.renderExpenses()}
                        {this.renderSubTypes()}
                        {isAddingSubType ? (
                            <TypeForm
                                handleCreate={this.handleCreateSubType}
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
    type: PropTypes.object.isRequired
};

export default Type;
