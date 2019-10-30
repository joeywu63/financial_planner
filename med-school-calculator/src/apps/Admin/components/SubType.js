import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Expense from './Expense';

import { getSubTypeExpenses } from '../repository';

import Button from 'common/Button';

const SubTypeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SubTypeHeader = styled.div`
    font-weight: bold;
    font-size: 25px;
`;

class SubType extends React.Component {
    state = {
        loading: true,
        expenses: null
    };

    async componentDidMount() {
        try {
            const { id, typeID } = this.props.subType;

            const expenses = await getSubTypeExpenses({
                typeID,
                subTypeID: id
            });

            this.setState({ expenses, loading: false });
        } catch (e) {
            // TODO: show error
        }
    }

    renderExpenses = () => {
        const { expenses } = this.state;

        return expenses.map(expense => (
            <Expense key={expense.id} expense={expense} />
        ));
    };

    renderHeader = () => {
        const { handleDeleteSubType } = this.props;
        const { id, name } = this.props.subType;

        return (
            <SubTypeWrapper>
                <SubTypeHeader>{name}</SubTypeHeader>
                <Button text="Delete" onClick={() => handleDeleteSubType(id)} />
            </SubTypeWrapper>
        );
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                {this.renderHeader()}
                {loading ? <div>loading</div> : this.renderExpenses()}
            </>
        );
    }
}

SubType.propTypes = {
    subType: PropTypes.object.isRequired,
    handleDeleteSubType: PropTypes.func.isRequired
};

export default SubType;
