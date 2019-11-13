import React from 'react';

class Expense extends React.Component {
    state = { checked: false };

    handleChange = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked });
        this.props.onChange(this.props, !checked);
    };

    render() {
        const { checked } = this.state;
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
            </div>
        );
    }
}

export default Expense;
