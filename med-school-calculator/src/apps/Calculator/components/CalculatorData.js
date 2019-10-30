import React from 'react';

class CalculatorData extends React.Component {


    render() {
        const {total} = this.props;
        console.log(total);
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>Subtype 1: </h2>
                <div>
                    <select></select> Price: 0$
                </div>
                <div>
                    <select></select> Price: 5$
                </div>

                <h2>Subtype 2: </h2>
                <div>
                    <select></select> Price: 0$
                </div>

                <h1>Total so far: ${total}</h1>
            </div>
        )
    }
}

export default CalculatorData;