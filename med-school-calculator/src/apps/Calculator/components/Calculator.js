import React from 'react';
import styled from 'styled-components';

import Chevron from './Chevron';
import FirstChevron from './FirstChevron';
import Type from './Type';
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
            // See if all the types have been cached
            if (!localStorage.getItem('allTypes')) {
                const types = await getAllTypes();
                localStorage.setItem('allTypes', JSON.stringify(types));
            }
            const types = JSON.parse(localStorage.getItem('allTypes'));
            if (!localStorage.getItem(currentStage)) {
                const subTypes = await getSubtypesByType(types[0].id);
                localStorage.setItem(currentStage, JSON.stringify(subTypes));
            }
            const subTypes = JSON.parse(localStorage.getItem(currentStage));
            const stateSubTypes = { ...this.state.subTypes };
            stateSubTypes[currentStage] = subTypes;
            this.setState({ loading: false, types, subTypes: stateSubTypes });
        } catch (e) {
            console.log('something went wrong');
        }
    }

    handleClick = async (id, name) => {
        if (name === 'Breakdown') {
            this.setState({ currentStage: name });
            return;
        }
        const stateSubtypes = { ...this.state.subTypes };
        if (!stateSubtypes[name]) {
            if (!localStorage.getItem(name)) {
                const subTypes = await getSubtypesByType(id);
                localStorage.setItem(name, JSON.stringify(subTypes));
            }
            const subTypes = JSON.parse(localStorage.getItem(name));
            stateSubtypes[name] = subTypes;
            this.setState({ subTypes: stateSubtypes, currentStage: name });
        } else {
            this.setState({
                currentStage: name
            });
        }
    };

    renderList = () => {
        const { types, currentStage } = this.state;

        return types.map(item => (
            <Chevron
                onClick={() => this.handleClick(item.id, item.name)}
                key={item.id}
                title={item.name}
                isSelected={currentStage === item.name}
            />
        ));
    };

    renderType = () => {
        const { currentStage, subTypes } = this.state;
        if (currentStage === 'Breakdown') {
            return <Breakdown />;
        } else {
            return (
                <Type title={currentStage} subTypes={subTypes[currentStage]} />
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
                {loading ? console.log('Loading...') : this.renderType()}
            </div>
        );
    }
}

export default Calculator;
