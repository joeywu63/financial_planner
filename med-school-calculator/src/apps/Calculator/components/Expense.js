import React from 'react';
import PropTypes from 'prop-types';

import { getAlternativesByExpense } from '../repository';
import Alternative from './Alternative';

class Expense extends React.Component {
    async componentDidMount() {
        const data = await getAlternativesByExpense({
            expenseID: this.props.id
        });
        this.setState({ loading: false, alternatives: data });

        if(this.props.checked){
            this.handleChange();
        }
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
                            checked={this.props.checkedItems.has(alt.id)}
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
                    ? <>Loading...</>
                    : this.renderAlternatives(alternatives)}
            </div>
        );
    }
}

Expense.propTypes = {
    checked: PropTypes.bool
}

export default Expense;
