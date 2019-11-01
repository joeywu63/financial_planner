import React from 'react';
import Subtype from './Subtype';
import {getSubtypesByType} from '../repository';

class CalculatorData extends React.Component {

    // TODO: This is a scotch tape fix for a memory leak, fix this eventually
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            subtypes: [],
            loading: true,
            costs: [
                {name: "Option 1", cost: 50, selected: false},
                {name: "Option 2", cost: 100, selected: false},
                {name: "Option 4", cost: 80, selected: false},
            ]
        }
    }

    componentDidMount() {
        this._isMounted = true;
        getSubtypesByType(this.props.title).then(data => {
                if (this._isMounted) {
                    this.setState({loading: false, subtypes: data});
                }
        });
    }

    componentDidUpdate() {
        //  Old code: getSubtypesByType(this.props.title).then(data => {
        //     if (this._isMounted) {
        //         this.setState({loading: false, subtypes: data});
        //     }
        // });

        // New code:
        if (this._isMounted) {
            
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderList = subtypes => {
        return (
            <div>
                {subtypes.map(subtype => (
                    <Subtype key={subtype.id} title={subtype.name}></Subtype>
                ))}
            </div>
        );
    }

    render() {
        const {subtypes, loading} = this.state;
        return (
            <div>
                <h1>{this.props.title}</h1>
                {loading ? console.log("Loading...") : this.renderList(subtypes)}
                <h2 >Total so far: ${this.state.total}</h2>
            </div>
        )
    }

    // temp() {
    //     <form>
    //                 <input
    //                     type={"checkbox"}
    //                     id={this.state.costs[0].name}
    //                     name={this.state.costs[0].name}
    //                     onChange={this.selectCost}
    //                 />${this.state.costs[0].cost}: {this.state.costs[0].name}<br/>
    //                 <input
    //                     type={"checkbox"}
    //                     id={this.state.costs[1].name}
    //                     name={this.state.costs[1].name}
    //                     onChange={this.selectCost}
    //                     checked={this.state.costs[1].selected}
    //                 />${this.state.costs[1].cost}: {this.state.costs[1].name}<br/>
    //             </form>
    // }

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