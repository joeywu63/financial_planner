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
        subTypes: []
    };

    async componentDidMount() {
        try {
            const types = await getAllTypes();
            this.setState({ loading: false, types });
        } catch (e) {
            console.log('something went wrong');
        }
    }

    handleClick = name => {
        this.setState({
            currentStage: name
        });
        if (name !== 'Breakdown') {
            getSubtypesByType(name).then(data => {
                this.setState({
                    subTypes: data
                });
            });
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
        const { currentStage } = this.state;
        if (currentStage === 'Breakdown') {
            return <Breakdown />;
        } else {
            return (
                <CalculatorData
                    title={currentStage}
                    subTypes={this.state.subTypes}
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
                {this.renderCalculatorData()}
            </div>
        );
    }
}

export default Calculator;
