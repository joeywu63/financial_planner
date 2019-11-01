import React from 'react';
import {getExpensesBySubtype} from "../repository";
import Expense from "./Expense";


class Subtype extends React.Component {

    state = {
        expenses: [],
        selections: [],
        totalPrice: 0
    };

    componentDidMount() {
        getExpensesBySubtype({subtypeName: this.props.title}).then(data => this.setState({loading: false, expenses: data}));
    }

    handleSelection = (expense, wasChecked) => {
        const {selections, totalPrice} = this.state;
        if (wasChecked) {
            this.setState({totalPrice: totalPrice + expense.cost});
        }
        else {
            this.setState({totalPrice: totalPrice - expense.cost});
        }
        this.props.handleSelection(expense, wasChecked);
    }

    renderExpenses = (expenses) => {
        return (
            <div>
                {expenses.map(expense => (
                    <Expense key={expense.id} name={expense.name} description={expense.description} 
                             cost={expense.cost} onChange={this.handleSelection}></Expense>
                ))}
            </div>
        );
    }

    render() {
        const {loading, expenses} = this.state;

        return (
            <div>
                <h2>{this.props.title}</h2>
                {loading ? console.log(loading) : this.renderExpenses(expenses)}
                <h3>Total of {this.props.title}: {this.state.totalPrice}$</h3>
            </div>
        )
    }
}

export default Subtype;