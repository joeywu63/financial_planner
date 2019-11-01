import React from 'react';

class Expense extends React.Component {

    state = {checked: false};

    handleChange = () => {
        const {checked} = this.state;
        this.setState({checked: !checked});
        this.props.onChange(this.props, !checked);
    } 

    render() {
        const {checked} = this.state; 
        return (
            <div>
                <form>
                    <label>{`${this.props.name} : ${this.props.description}`}</label>
                    <input type="checkbox" checked={checked} onChange={this.handleChange}></input>
                    <small>{this.props.cost + "$"}</small>
                </form>
            </div>
        );
    }
}

export default Expense;