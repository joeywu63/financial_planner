import React from 'react';
import styled from 'styled-components';
import { getExpensesBySubtype, getAlternativesForSubtype } from '../repository';
import Expense from './Expense';
import Alternative from './Alternative';

import Spinner from 'common/Spinner';

import { errorToast } from 'utils/helpers';
import { COLOURS } from 'utils/constants';
import { Grid } from "styled-css-grid";

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

const ExpenseWrapper = styled.div`
    width: 90%;
    color: ${COLOURS.white};
`;

const SubAlts = styled.div`
    margin-bottom: 20px;
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
    font-weight: bold;
    margin-left: 20px;
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
            let { expenses } = this.props;
            if (!expenses) {
                expenses = JSON.parse(localStorage.getItem(title));
                if (!expenses) {
                    expenses = await getExpensesBySubtype({ subTypeID: id });
                    localStorage.setItem(title, JSON.stringify(expenses));
                }
            }
            let alternatives = JSON.parse(
                localStorage.getItem(`${title}-alternatives`)
            );
            if (!alternatives) {
                const alternatives = await getAlternativesForSubtype({
                    subtypeID: id
                });
                localStorage.setItem(
                    `${title}-alternatives`,
                    JSON.stringify(alternatives)
                );
            }
            this.setState({ loading: false, expenses, alternatives });
        } catch (e) {
            errorToast();
        }
    }

    handleSelection = (expense, wasChecked) => {
        if (wasChecked) {
            this.setState((prevState, props) => {
                return { totalPrice: prevState.totalPrice + expense.cost };
            });
        } else {
            this.setState((prevState, props) => {
                return { totalPrice: prevState.totalPrice - expense.cost };
            });
        }
        this.props.handleSelection(expense, wasChecked);
    };

    renderAlternatives = alternatives => {
        if (alternatives && alternatives.length !== 0) {
            return (
                <SubAlts>
                    <Bold>Alternative Options:</Bold>
                    {alternatives.map(alt => (
                        <Alternative
                            key={alt.id}
                            id={alt.id}
                            name={alt.name}
                            description={alt.description}
                            url={alt.url}
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
            <Grid columns={10} gap="2px" alignContent="center">
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
            </Grid>
        );
    };

    render() {
        const { loading, expenses, alternatives } = this.state;

        return (
            <SubtypeBox>
                <Title>{this.props.title}</Title>
                {loading ? (
                    <Spinner />
                ) : (
                    <ExpenseWrapper>
                        {this.renderAlternatives(alternatives)}
                        {this.renderExpenses(expenses)}
                    </ExpenseWrapper>
                )}
                <Subtitle>Subtotal: ${this.state.totalPrice}</Subtitle>
            </SubtypeBox>
        );
    }
}

export default Subtype;
