import React from 'react';
import Subtype from './Subtype';

class Type extends React.Component {
    state = {
        total: 0,
        subtypes: []
    };

    handleSelection = (expense, wasChecked) => {
        const { total } = this.state;
        if (wasChecked) {
            this.setState({ total: total + expense.cost });
        } else {
            this.setState({ total: total - expense.cost });
        }
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
