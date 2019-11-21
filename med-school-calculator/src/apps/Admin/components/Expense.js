import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';

import ExpenseForm from './ExpenseForm';

import IconButton from 'common/IconButton';

const StyledIconButton = styled(IconButton)`
    visibility: ${props => (props.isHovering ? 'visible' : 'hidden')};
`;

class Expense extends React.Component {
    state = {
        loading: true,
        expenses: null,
        isEditingExpense: false,
        isHovering: false
    };

    handleUpdateExpense = (name, description, cost) => {
        const { handleUpdateExpense } = this.props;
        const { id } = this.props.expense;

        handleUpdateExpense(id, name, description, cost);
        this.setState({ isEditingExpense: false });
    };

    handleOnMouseEnter = () => {
        this.setState({ isHovering: true });
    };

    handleOnMouseLeave = () => {
        this.setState({ isHovering: false });
    };

    toggleEditExpense = () => {
        const { isEditingExpense } = this.state;
        this.setState({ isEditingExpense: !isEditingExpense });
    };

    render() {
        const { id, name, cost, description } = this.props.expense;
        //handleDeleteExpense passed in from either Type.js (expenses without a subtype) or SubType.js
        const { handleDeleteExpense } = this.props;
        const { isEditingExpense, isHovering } = this.state;

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
                    <StyledIconButton
                        name="plus-square"
                        onClick={() => {}}
                        isHovering={isHovering}
                    />
                    <StyledIconButton
                        name="pen"
                        onClick={this.toggleEditExpense}
                        isHovering={isHovering}
                    />
                    <StyledIconButton
                        name="trash-alt"
                        onClick={() => handleDeleteExpense(id)}
                        isHovering={isHovering}
                    />
                </Cell>
            </>
        );
    }
}

Expense.propTypes = {
    expense: PropTypes.object.isRequired
};

export default Expense;
