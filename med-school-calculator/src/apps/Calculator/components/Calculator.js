import React from 'react';
import styled from 'styled-components';

import Chevron from './Chevron';
import FirstChevron from './FirstChevron';
import CalculatorData from './CalculatorData';
import Breakdown from './Breakdown';

import { getAllTypes, getSubtypesByType } from '../repository';

const NavBar = styled.ul`
    list-style: none;
    overflow: hidden;
    background-color: white;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
`;

class Calculator extends React.Component {
    state = {
        loading: true,
        currentStage: 'Interview Process',
        types: [],
        subTypes: {}
    };

    async componentDidMount() {
        try {
            const { currentStage } = this.state;
            const types = await getAllTypes();
            const subTypes = await getSubtypesByType(currentStage);
            const stateSubTypes = { ...this.state.subTypes };
            stateSubTypes[currentStage] = subTypes;
            this.setState({ loading: false, types, subTypes: stateSubTypes });
        } catch (e) {
            console.log('something went wrong');
        }
    }

    handleClick = name => {
        const stateSubtypes = { ...this.state.subTypes };
        if (name !== 'Breakdown') {
            if (!stateSubtypes[name]) {
                console.log('about to make call')
                getSubtypesByType(name).then(data => {
                    stateSubtypes[name] = data;
                    this.setState({
                        subTypes: stateSubtypes,
                        currentStage: name
                    });
                });
            }
            else {
                this.setState({
                    currentStage: name
                });
            }
        }
    };

    renderList = () => {
        const { types, currentStage } = this.state;

        return types.map(item => (
            <Chevron
                onClick={() => this.handleClick(item.name)}
                key={item.id}
                title={item.name}
                isSelected={currentStage === item.name}
            />
        ));
    };

    renderCalculatorData = () => {
        const { currentStage, subTypes } = this.state;
        console.log(subTypes);
        if (currentStage === 'Breakdown') {
            return <Breakdown />;
        } else {
            return (
                <CalculatorData
                    title={currentStage}
                    subTypes={subTypes[currentStage]}
                />
            );
        }
    };

    render() {
        const { loading } = this.state;
        return (
            <div>
                <NavBar>
                    <FirstChevron />
                    {loading ? console.log('Loading...') : this.renderList()}
                </NavBar>
                {loading
                    ? console.log('Loading...')
                    : this.renderCalculatorData()}
            </div>
        );
    }
}

export default Calculator;
