import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell, Grid } from 'styled-css-grid';

import Alternative from './Alternative';
import AlternativeForm from './AlternativeForm';
import Expense from './Expense';
import TypeForm from './TypeForm';
import ExpenseForm from './ExpenseForm';
import DeleteModal from 'common/DeleteModal';

import {
    getSubTypeExpenses,
    deleteExpense,
    updateExpense,
    createExpense,
    getAlternativesForSubtype,
    createAlternative,
    deleteAlternative,
    updateAlternative
} from '../repository';
import { errorToast } from 'utils/helpers';

import Button from 'common/Button';
import Hoverable from 'common/Hoverable';
import IconButton from 'common/IconButton';

const Wrapper = styled.div`
    padding-left: 40px;
`;

const AltWrapper = styled.div`
    padding-left: 40px;
`;

const SubTypeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SubTypeHeader = styled.div`
    font-weight: bold;
    font-size: 25px;
`;

const StyledIconButton = styled(IconButton)`
    visibility: ${props => (props.isHovering ? 'visible' : 'hidden')};
`;

class SubType extends React.Component {
    state = {
        loading: true,
        expenses: null,
        isAddingExpense: false,
        isEditingSubType: false,
        isModalOpen: false,
        alternatives: null,
        isAddingAlternative: false
    };

    async componentDidMount() {
        try {
            const { id, typeID } = this.props.subType;

            const expenses = await getSubTypeExpenses({
                typeID,
                subTypeID: id
            });
            const alternatives = await getAlternativesForSubtype({
                subtypeID: id
            });
            this.setState({ expenses, alternatives, loading: false });
        } catch (e) {
            errorToast();
        }
    }

    handleUpdateSubType = (id, name) => {
        const { handleUpdateSubType } = this.props;

        handleUpdateSubType(id, name);

        this.setState({ isEditingSubType: false });
    };

    createTemporaryExpense = (
        id,
        typeID,
        subTypeID,
        name,
        description,
        cost
    ) => {
        return {
            id,
            typeID,
            subTypeID,
            name,
            description,
            cost
        };
    };

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

    handleCreateAlternative = async (name, description, url, cost) => {
        try {
            const { id: subTypeID } = this.props.subType;
            const { alternatives } = this.state;
            const expenseID = '';

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
                    url
                )
            );
            this.setState({ isAddingAlternative: false, alternatives });
        } catch (e) {
            errorToast();
        }
    };

    handleCreateExpense = async (name, description, cost) => {
        try {
            const { id: subTypeID, typeID } = this.props.subType;
            const { expenses } = this.state;

            const expenseID = await createExpense({
                typeID,
                subTypeID,
                name,
                description,
                cost
            });

            expenses.push(
                this.createTemporaryExpense(
                    expenseID,
                    typeID,
                    subTypeID,
                    name,
                    description,
                    cost
                )
            );
            this.setState({ isAddingExpense: false, expenses });
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

    handleDeleteExpense = async expenseID => {
        const { expenses } = this.state;
        try {
            await deleteExpense({ expenseID });
        } catch (e) {
            errorToast();
        }
        const newExpenses = expenses.filter(
            expense => expense.id !== expenseID
        );
        this.setState({ expenses: newExpenses });
    };

    handleUpdateExpense = async (expenseID, name, description, cost) => {
        try {
            const { expenses } = this.state;

            await updateExpense({ expenseID, name, description, cost });

            const newExpenses = expenses.map(expense => {
                if (expense.id === expenseID) {
                    expense = {
                        ...expense,
                        name,
                        description,
                        cost
                    };
                }
                return expense;
            });
            this.setState({ expenses: newExpenses });
        } catch (e) {
            errorToast();
        }
    };

    handleUpdateAlternative = async (
        alternativeID,
        name,
        description,
        url,
        cost
    ) => {
        try {
            const { alternatives } = this.state;

            await updateAlternative({
                alternativeID,
                name,
                description,
                url,
                cost
            });

            const newAlternatives = alternatives.map(alternative => {
                if (alternative.id === alternativeID) {
                    alternative = {
                        ...alternative,
                        name,
                        description,
                        url,
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

    renderExpenses = () => {
        const { expenses, isAddingExpense } = this.state;

        return (
            <Grid columns={10} gap="2px" alignContent="center">
                {expenses.map(expense => (
                    <Expense
                        key={expense.id}
                        expense={expense}
                        handleDeleteExpense={this.handleDeleteExpense}
                        handleUpdateExpense={this.handleUpdateExpense}
                    />
                ))}
                {isAddingExpense ? (
                    <ExpenseForm
                        handleSubmit={this.handleCreateExpense}
                        handleCancel={this.toggleAddingExpense}
                    />
                ) : (
                    <Cell width={2}>
                        <Button
                            text="Add Expense"
                            onClick={this.toggleAddingExpense}
                        />
                    </Cell>
                )}
            </Grid>
        );
    };

    renderAlternatives = () => {
        const { alternatives, isAddingAlternative } = this.state;

        return (
            <>
                {alternatives.length > 0 && <b>Alternative Options:</b>}
                <Grid columns={10} gap="2px" alignContent="center">
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
                </Grid>
            </>
        );
    };

    renderHeader = () => {
        const { handleDeleteSubType } = this.props;
        const { id, name } = this.props.subType;
        const { isEditingSubType, isModalOpen } = this.state;

        return isEditingSubType ? (
            <TypeForm
                handleCancel={this.toggleEditSubType}
                handleSubmit={name => this.handleUpdateSubType(id, name)}
                name={name}
            />
        ) : (
            <>
                <DeleteModal
                    isOpen={isModalOpen}
                    onRequestClose={this.toggleModal}
                    onDelete={() => handleDeleteSubType(id)}
                    deleteConfirmationName="DELETE"
                />
                <Hoverable>
                    {(isHovering, mouseEnter, mouseLeave) => (
                        <SubTypeWrapper
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                        >
                            <SubTypeHeader>{name}</SubTypeHeader>
                            <StyledIconButton
                                title="Add Alternative"
                                name="plus-square"
                                onClick={this.toggleAddingAlternative}
                                isHovering={isHovering}
                            />
                            <StyledIconButton
                                name="pen"
                                onClick={this.toggleEditSubType}
                                isHovering={isHovering}
                            />
                            <StyledIconButton
                                name="trash-alt"
                                onClick={this.toggleModal}
                                isHovering={isHovering}
                            />
                        </SubTypeWrapper>
                    )}
                </Hoverable>
            </>
        );
    };

    toggleEditSubType = () => {
        const { isEditingSubType } = this.state;
        this.setState({ isEditingSubType: !isEditingSubType });
    };

    toggleAddingAlternative = () => {
        const { isAddingAlternative } = this.state;
        this.setState({ isAddingAlternative: !isAddingAlternative });
    };

    toggleAddingExpense = () => {
        const { isAddingExpense } = this.state;
        this.setState({ isAddingExpense: !isAddingExpense });
    };

    toggleModal = () => {
        const { isModalOpen } = this.state;

        this.setState({ isModalOpen: !isModalOpen });
    };

    render() {
        const { loading, alternatives } = this.state;

        return (
            <Wrapper>
                {this.renderHeader()}
                {alternatives ? (
                    <>
                        <Cell width={10}>
                            <AltWrapper>
                                {loading ? (
                                    <div>loading</div>
                                ) : (
                                    this.renderAlternatives()
                                )}
                            </AltWrapper>
                        </Cell>
                    </>
                ) : (
                    ''
                )}
                {loading ? <div>loading</div> : this.renderExpenses()}
            </Wrapper>
        );
    }
}

SubType.propTypes = {
    subType: PropTypes.object.isRequired,
    handleDeleteSubType: PropTypes.func.isRequired,
    handleUpdateSubType: PropTypes.func.isRequired
};

export default SubType;
