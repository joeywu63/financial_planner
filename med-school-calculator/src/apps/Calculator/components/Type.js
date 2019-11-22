import React from 'react';
import Subtype from './Subtype';
import { getExpense } from '../repository';

class Type extends React.Component {
    state = {
        subtypes: [],
        total: 0
    };

    async componentDidMount() {
        const { checked } = this.props;

        let sum = 0;
        checked.forEach(async e => {
            const expense = await getExpense({ expenseID: e });
            sum += expense.cost;
            this.setState({ total: sum });
        });
    }

    handleSelection = (expense, wasChecked) => {
        const { checked } = this.props;
        const { total } = this.state;
        if (wasChecked) {
            if (!checked.has(expense.id)) {
                this.setState({ total: total + expense.cost });
            }
        } else {
            this.setState({ total: total - expense.cost });
        }
        this.props.handleSelection(expense, wasChecked);
    };

    renderList = subtypes => {
        return (
            <div>
                {subtypes.map(subtype => (
                    <Subtype
                        handleSelection={this.handleSelection}
                        key={subtype.id}
                        id={subtype.id}
                        title={subtype.name}
                        checked={this.props.checked}
                    ></Subtype>
                ))}
            </div>
        );
    };

    render() {
        const { subTypes } = this.props;
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.renderList(subTypes)}
                <h2>Total so far: ${this.state.total}</h2>
            </div>
        );
    }
}

export default Type;
