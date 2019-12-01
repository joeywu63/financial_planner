import React from 'react';
import Subtype from './Subtype';
import { getExpense, getAlternative, saveProgress } from '../repository';

class Type extends React.Component {
    state = {
        subTypes: [],
        expenses: [],
        total: 0
    };

    async componentDidMount() {
        const { checked } = this.props;
        let sum = 0;
        for (const id of checked) {
            try {
                const expense = await getExpense({ expenseID: id });
                if (expense !== undefined) {
                    sum += expense.cost;
                } else {
                    const alt = await getAlternative({ alternativeID: id });
                    sum += alt.cost;
                }
            } catch (error) {
                const removedInvalid = [...checked].filter(item => item !== id);
                saveProgress(removedInvalid).catch(err => {
                    alert(err);
                });
                continue;
            }
        }
        Promise.all(checked).then(res => this.setState({ total: sum }));
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

    renderList = (subtypes, expenses) => {
        const { title } = this.props;
        if (expenses.length !== 0) {
            const newSubtype = {
                id: null,
                name: 'Miscellanous',
                key: `${title}-Miscellanous`,
                typeID: subtypes[0].typeID
            };
            subtypes = subtypes.concat([newSubtype]);
        }
        return (
            <div>
                {subtypes.map(subtype => (
                    <Subtype
                        handleSelection={this.handleSelection}
                        key={subtype.id || subtype.key}
                        id={subtype.id}
                        title={subtype.name}
                        checked={this.props.checked}
                        typeID={subtype.typeID}
                        typeTitle={title}
                    ></Subtype>
                ))}
            </div>
        );
    };

    render() {
        const { subTypes, expenses } = this.props;
        return (
            <div>
                <h1>{this.props.title}</h1>
                {this.renderList(subTypes, expenses)}
                <h2>Total so far: ${this.state.total}</h2>
            </div>
        );
    }
}

export default Type;
