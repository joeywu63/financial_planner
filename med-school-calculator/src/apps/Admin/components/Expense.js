import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';

import Alternative from './Alternative';
import AlternativeForm from './AlternativeForm';
import ExpenseForm from './ExpenseForm';

import {
    getAlternativesByExpense,
    deleteAlternative,
    updateAlternative,
    createAlternative
} from '../repository';

import { errorToast } from 'utils/helpers';
import IconButton from 'common/IconButton';
import InfoTooltip from 'common/InfoTooltip';
import DeleteModal from 'common/DeleteModal';

const StyledIconButton = styled(IconButton)`
    visibility: ${props => (props.isHovering ? 'visible' : 'hidden')};
`;

const AltWrapper = styled.div`
    padding-left: 40px;
`;

class Expense extends React.Component {
    state = {
        alternatives: [],
        loading: true,
        expenses: null,
        isAddingAlternative: false,
        isEditingExpense: false,
        isHovering: false,
        isModalOpen: false
    };

    async componentDidMount() {
        try {
            const { id } = this.props.expense;

            const alternatives = await getAlternativesByExpense({
                expenseID: id
            });

            this.setState({ alternatives, loading: false });
        } catch (e) {
            errorToast();
        }
    }

    createTemporaryAlternative = (
        id,
        expenseID,
        subTypeID,
        name,
        description,
        cost,
        url
    ) => {
        return {
            id,
            expenseID,
            subTypeID,
            name,
            description,
            cost,
            url
        };
    };

    handleCreateAlternative = async (name, description, cost, url) => {
        try {
            const { id: expenseID, subtypeID: subTypeID } = this.props.expense;
            const { alternatives } = this.state;

            const alternativeID = await createAlternative({
                expenseID,
                subTypeID,
                name,
                description,
                cost,
                url
            });

            alternatives.push(
                this.createTemporaryAlternative(
                    alternativeID,
                    expenseID,
                    subTypeID,
                    name,
                    description,
                    cost,
                )
            );
            this.setState({ isAddingAlternative: false, alternatives });
        } catch (e) {
            errorToast();
        }
    };

    handleUpdateExpense = (name, description, cost) => {
        const { handleUpdateExpense } = this.props;
        const { id } = this.props.expense;

        handleUpdateExpense(id, name, description, cost);
        this.setState({ isEditingExpense: false });
    };

    handleUpdateAlternative = async (alternativeID, name, description, cost) => {
        try {
            const { alternatives } = this.state;

            await updateAlternative({ alternativeID, name, description, cost });

            const newAlternatives = alternatives.map(alternative => {
                if (alternative.id === alternativeID) {
                    alternative = {
                        ...alternative,
                        name,
                        description,
                        cost
                    };
                }
                return alternative;
            });
            this.setState({ alternatives: newAlternatives });
        } catch (e) {
            errorToast();
        }
    };

    handleDeleteAlternative = async alternativeID => {
        const { alternatives } = this.state;
        try {
            await deleteAlternative({ alternativeID });
        } catch (e) {
            errorToast();
        }
        const newAlternatives = alternatives.filter(
            alternatives => alternatives.id !== alternativeID
        );
        this.setState({ alternatives: newAlternatives });
    };

    handleOnMouseEnter = () => {
        this.setState({ isHovering: true });
    };

    handleOnMouseLeave = () => {
        this.setState({ isHovering: false });
    };

    toggleAddingAlternative = () => {
        const { isAddingAlternative } = this.state;
        this.setState({ isAddingAlternative: !isAddingAlternative });
    };

    toggleEditExpense = () => {
        const { isEditingExpense } = this.state;
        this.setState({ isEditingExpense: !isEditingExpense });
    };

    toggleModal = () => {
        const { isModalOpen } = this.state;

        this.setState({ isModalOpen: !isModalOpen });
    }
    
    renderAlternatives = () => {
        const { alternatives, isAddingAlternative } = this.state;

        return (
            <>
                
                {alternatives.map(alternative => (
                    <Alternative
                        key={alternative.id}
                        alternative={alternative}
                        handleDeleteAlternative={this.handleDeleteAlternative}
                        handleUpdateAlternative={this.handleUpdateAlternative}
                    />
                ))}
                {isAddingAlternative ? (
                    <AlternativeForm
                        handleSubmit={this.handleCreateAlternative}
                        handleCancel={this.toggleAddingAlternative}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    };

    render() {
        const { id, name, cost, description } = this.props.expense;
        //handleDeleteExpense passed in from either Type.js (expenses without a subtype) or SubType.js
        const { handleDeleteExpense } = this.props;
        const { isEditingExpense, isHovering, isModalOpen, loading, alternatives } = this.state;

        return isEditingExpense ? (
            <ExpenseForm
                handleCancel={this.toggleEditExpense}
                handleSubmit={this.handleUpdateExpense}
                name={name}
                description={description}
                cost={cost}
            />
        ) : (
            <>
                <DeleteModal
                    isOpen={isModalOpen}
                    onRequestClose={this.toggleModal}
                    onDelete={() => handleDeleteExpense(id)}
                    deleteConfirmationName="DELETE"
                />
                <Cell
                    width={2}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                    middle={true}
                >
                    {name}
                </Cell>
                <Cell
                    width={5}
                    middle={true}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    {description}
                </Cell>
                <Cell
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                    middle={true}
                >{`$${cost}`}</Cell>
                <Cell
                    width={2}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    <InfoTooltip
                        hoverMessage={"Add Alternative"}
                        trigger={
                            <StyledIconButton
                                name="plus-square"
                                onClick={this.toggleAddingAlternative}
                                isHovering={isHovering}
                            />
                        }
                    />
                    <StyledIconButton
                        name="pen"
                        onClick={this.toggleEditExpense}
                        isHovering={isHovering}
                    />
                    <StyledIconButton
                        name="trash-alt"
                        onClick={this.toggleModal}
                        isHovering={isHovering}
                    />
                </Cell>
                <Cell width={10}>
                    {alternatives ? (
                        <AltWrapper>
                            {loading ? <div>loading</div> : this.renderAlternatives()}
                        </AltWrapper>
                    ) : ''}
                </Cell>
            </>
        );
    }
}

Expense.propTypes = {
    expense: PropTypes.object.isRequired
};

export default Expense;
