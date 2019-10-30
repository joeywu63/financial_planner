import React from 'react';
import styled from "styled-components";

class CalculatorData extends React.Component {

    // Here we will fetch the Stage Name from the database. 
    getTypeName(stage) {
        const stageToNameMap = {1: "Application Submission", 2: "Interview Process", 3: "MCAT", 4: "Finish"};
        return stageToNameMap[stage];
    }

    render() {
        return (
            <div>
                <h1>{this.getTypeName(this.props.stage)}</h1>
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