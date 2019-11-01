import React from 'react';

class Expense extends React.Component {

    state = {checked: false};
    
    render() {
        const {checked} = this.state; 
        return (
            <div>
                <form>
                    <label>{`${this.props.name} : ${this.props.description}`}</label>
                    <input type="checkbox" checked={checked}></input>
                    <text>{this.props.cost + "$"}</text>
                </form>
            </div>
        );
    }
}

export default Expense;