import React from 'react';
import { getAlternativesByExpense } from '../repository';
import Alternative from './Alternative';

class Expense extends React.Component {
    async componentDidMount() {
        const data = await getAlternativesByExpense({
            expenseID: this.props.id
        });
        this.setState({ loading: false, alternatives: data });
    }

    state = { loading: true, checked: false, alternatives: [] };

    handleChange = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked });
        this.props.onChange(this.props, !checked);
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
                            onChange={this.props.onChange}
                        ></Alternative>
                    ))}
                </div>
            );
        }
    };

    render() {
        const { loading, checked, alternatives } = this.state;
        const { name, description, cost } = this.props;
        return (
            <div>
                <form>
                    <label>{`${name} : ${description}`}</label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={this.handleChange}
                    ></input>
                    <small>{`${cost} $`}</small>
                </form>
                {loading
                    ? console.log(loading)
                    : this.renderAlternatives(alternatives)}
            </div>
        );
    }
}

export default Expense;
