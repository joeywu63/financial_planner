import React from 'react';
import {getExpensesBySubtype} from "../repository";
import Expense from "./Expense";


class Subtype extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            expenses: []
        }
    }

    componentDidMount() {
        getExpensesBySubtype({subtypeName: this.props.title}).then(data => this.setState({loading: false, expenses: data}));
    }

    renderExpenses = (expenses) => {
        return (
            <div>
                {expenses.map(expense => (
                    <Expense key={expense.id} name={expense.name} description={expense.description} cost={expense.cost}></Expense>
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
            </div>
        )
    }
}

export default Subtype;