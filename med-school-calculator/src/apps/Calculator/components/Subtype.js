import React from 'react';
import styled from 'styled-components';
import { getExpensesBySubtype, getAlternativesForSubtype } from '../repository';
import Expense from './Expense';
import Alternative from './Alternative';
import { errorToast } from 'utils/helpers';
import { COLOURS } from 'utils/constants';

const SubtypeBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${COLOURS.blue};
    flex: 0 0 45%;
    min-width: 600px;
    max-width: 40%;
    margin: 10px;
    align-items: center;
    justify-content: space-between;
`;

const SubAlts = styled.div`
    margin-bottom: 10px;
`;

const Title = styled.h2`
    color: ${COLOURS.white};
    font-weight: 500;
`;

const Subtitle = styled.h3`
    color: ${COLOURS.white};
    font-weight: 400;
`;

const Bold = styled.b`
    color: ${COLOURS.offWhite};
    font-weight: 500;
`;

class Subtype extends React.Component {
    state = {
        expenses: [],
        selections: [],
        alternatives: [],
        totalPrice: 0
    };

    async componentDidMount() {
        try {
            const { title, id } = this.props;
            let expenses = JSON.parse(localStorage.getItem(title));
            if (!expenses) {
                expenses = await getExpensesBySubtype({ subTypeID: id });
                localStorage.setItem(title, JSON.stringify(expenses));
            }
            const alternatives = await getAlternativesForSubtype({
                subtypeID: id
            });
            this.setState({ loading: false, expenses, alternatives });
        } catch (e) {
            errorToast();
        }
    }

    handleSelection = (expense, wasChecked) => {
        const { totalPrice } = this.state;
        if (wasChecked) {
            this.setState({ totalPrice: totalPrice + expense.cost });
        } else {
            this.setState({ totalPrice: totalPrice - expense.cost });
        }
        this.props.handleSelection(expense, wasChecked);
    };

    renderAlternatives = alternatives => {
        if (alternatives.length !== 0) {
            return (
                <SubAlts>
                    <Bold>Alternative Options:</Bold>
                    {alternatives.map(alt => (
                        <Alternative
                            key={alt.id}
                            id={alt.id}
                            name={alt.name}
                            description={alt.description}
                            cost={alt.cost}
                            checked={this.props.checked.has(alt.id)}
                            onChange={this.handleSelection}
                        />
                    ))}
                </SubAlts>
            );
        }
    };

    renderExpenses = expenses => {
        return (
            <div>
                {expenses.map(expense => (
                    <Expense
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        description={expense.description}
                        cost={expense.cost}
                        onChange={this.handleSelection}
                        checked={this.props.checked.has(expense.id)}
                        checkedItems={this.props.checked}
                    />
                ))}
            </div>
        );
    };

    render() {
        const { loading, expenses, alternatives } = this.state;

        return (
            <SubtypeBox>
                <Title>{this.props.title}</Title>
                {loading ? (
                    <>Loading...</>
                ) : (
                    <div>
                        {this.renderAlternatives(alternatives)}
                        {this.renderExpenses(expenses)}
                    </div>
                )}
                <Subtitle>Subtotal: ${this.state.totalPrice}</Subtitle>
            </SubtypeBox>
        );
    }
}

export default Subtype;
