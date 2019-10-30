import React from 'react';

class CalculatorData extends React.Component {


    render() {
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
            </div>
        )
    }
}

export default CalculatorData;