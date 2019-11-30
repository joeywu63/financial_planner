import React from 'react';
import styled from 'styled-components';

import Chevron from './Chevron';
import FirstChevron from './FirstChevron';
import Type from './Type';
import Breakdown from './Breakdown';

import {
    getAllTypes,
    getSubtypesByType,
    saveProgress,
    getDatabaseVersion,
    updateVersionForUser
} from '../repository';
import { getCurrentUser, setCurrentUser } from 'utils/currentUser';

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
        currentStage: 'MCAT',
        types: [],
        subTypes: {}
    };

    checked = new Set();

    async componentDidMount() {
        this.checked = getCurrentUser().progress;

        try {
            // Check if user is up to date with database
            const user = getCurrentUser();
            const databaseVersion = await getDatabaseVersion();
            if (user.version !== databaseVersion) {
                localStorage.clear();
                user.version = databaseVersion;
                setCurrentUser(user);
                updateVersionForUser(user.uid, databaseVersion);
            }
            const { currentStage, subTypes } = this.state;
            // See if all the types have been cached
            let allTypes = JSON.parse(localStorage.getItem('allTypes'));
            if (!allTypes) {
                allTypes = await getAllTypes();
                localStorage.setItem('allTypes', JSON.stringify(allTypes));
            }
            let subTypesOfType = JSON.parse(localStorage.getItem(currentStage));
            const id = allTypes[0].id;
            if (!subTypesOfType) {
                subTypesOfType = await getSubtypesByType({ typeID: id });
                localStorage.setItem(
                    currentStage,
                    JSON.stringify(subTypesOfType)
                );
            }
            subTypes[currentStage] = subTypesOfType;
            this.setState({ loading: false, types: allTypes, subTypes });
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (id, name) => {
        saveProgress(this.checked).catch(err => {
            alert(err);
        });

        if (name === 'Breakdown') {
            this.setState({ currentStage: name });
            return;
        }
        const { subTypes } = this.state;
        if (!subTypes[name]) {
            let subTypesOfType = JSON.parse(localStorage.getItem(name));
            if (!subTypesOfType) {
                subTypesOfType = await getSubtypesByType({ typeID: id });
                localStorage.setItem(name, JSON.stringify(subTypesOfType));
            }
            subTypes[name] = subTypesOfType;
            this.setState({ subTypes, currentStage: name });
        } else {
            this.setState({
                currentStage: name
            });
        }
    };

    handleSelection = (expense, wasChecked) => {
        if (wasChecked) {
            this.checked.add(expense.id);
        } else {
            this.checked.delete(expense.id);
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
                <Type
                    handleSelection={this.handleSelection}
                    title={currentStage}
                    subTypes={subTypes[currentStage]}
                    checked={this.checked}
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
                    {loading ? <>Loading...</> : this.renderList()}
                </NavBar>
                {loading ? <>Loading...</> : this.renderType()}
            </div>
        );
    }
}

export default Calculator;
