import React from 'react';

class CalculatorData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            costs: [
                {name: "Option 1", cost: 50, selected: false},
                {name: "Option 2", cost: 100, selected: false},
                {name: "Option 4", cost: 80, selected: false},
            ]
        }
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>Subtype 1: </h2>
                <form>
                    <input
                        type={"checkbox"}
                        id={this.state.costs[0].name}
                        name={this.state.costs[0].name}
                        onChange={this.selectCost}
                        checked={this.state.costs[0].selected}
                    />${this.state.costs[0].cost}: {this.state.costs[0].name}<br/>
                    <input
                        type={"checkbox"}
                        id={this.state.costs[1].name}
                        name={this.state.costs[1].name}
                        onChange={this.selectCost}
                        checked={this.state.costs[1].selected}
                    />${this.state.costs[1].cost}: {this.state.costs[1].name}<br/>
                </form>
                <h2 >Total so far: ${this.state.total}</h2>
            </div>
        )
    }

    selectCost = (event) => {
        const target = event.target;
        const newCosts = this.state.costs.map((cost) => {
            if (cost.name === target.id) {
                cost.selected = !cost.selected;
                if (cost.selected) {
                    this.state.total += cost.cost;
                } else {
                    this.state.total -= cost.cost;
                }
            }
            return cost;
        });
        this.setState({costs: newCosts})
    }
}

export default CalculatorData;