import React from 'react';
import { getExpensesBySubtype, getAlternativesForSubtype } from '../repository';
import Expense from './Expense';
import Alternative from './Alternative';

class Subtype extends React.Component {
    state = {
        expenses: [],
        selections: [],
        alternatives: [],
        totalPrice: 0
    };

    async componentDidMount() {
        const { title, id } = this.props;
        let expenses = JSON.parse(localStorage.getItem(title));
        if (!expenses) {
            expenses = await getExpensesBySubtype({ subTypeID: id });
            localStorage.setItem(title, JSON.stringify(expenses));
        }
        const alternatives = await getAlternativesForSubtype({ subtypeID: id });
        this.setState({ loading: false, expenses, alternatives });
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
        if (!alternatives.length == 0) {
            return (
                <div>
                    <b>Alternative options:</b>
                    {alternatives.map(alt => (
                        <Alternative
                            key={alt.id}
                            id={alt.id}
                            name={alt.name}
                            description={alt.description}
                            cost={alt.cost}
                            checked={this.props.checked.has(alt.id)}
                            onChange={this.handleSelection}
                        ></Alternative>
                    ))}
                </div>
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
                    ></Expense>
                ))}
            </div>
        );
    };

    render() {
        const { loading, expenses, alternatives } = this.state;

        return (
            <div>
                <h2>{this.props.title}</h2>
                {loading ? (
                    <>Loading...</>
                ) : (
                    <div>
                        {this.renderAlternatives(alternatives)}
                        {this.renderExpenses(expenses)}
                    </div>
                )}
                <h3>Subtotal: ${this.state.totalPrice}</h3>
            </div>
        );
    }
}

export default Subtype;
