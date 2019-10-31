import React from 'react';
import {getExpensesBySubtype} from "../repository";


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
                    <h4 key={expense.id}>{expense.name}</h4>
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