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
    updateVersionForUser,
    getTypeExpenses
} from '../repository';

import Button from 'common/Button';

import { getCurrentUser, setCurrentUser } from 'utils/currentUser';
import { errorToast } from 'utils/helpers';
import { COLOURS } from 'utils/constants';

const NavBar = styled.ul`
    list-style: none;
    overflow: hidden;
    background-color: ${COLOURS.white};
    border: 1px solid ${COLOURS.blue};
    display: flex;
    flex-direction: row;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

class Calculator extends React.Component {
    state = {
        loading: true,
        currentStage: 'MCAT',
        types: [],
        subTypes: {},
        expenses: {}
    };

    checked = new Set();

    async componentDidMount() {
        this.checked = getCurrentUser().progress;

        try {
            // Check if user is up to date with database
            const user = getCurrentUser();
            const databaseVersion = await getDatabaseVersion();
            if (typeof databaseVersion !== 'number') {
                return;
            }

            if (user.version !== databaseVersion) {
                localStorage.clear();
                user.version = databaseVersion;
                setCurrentUser(user);
                updateVersionForUser(user.uid, databaseVersion);
            }
            const { currentStage, subTypes, expenses } = this.state;
            // See if all the types have been cached
            let allTypes = JSON.parse(localStorage.getItem('allTypes'));
            if (!allTypes) {
                allTypes = await getAllTypes();
                localStorage.setItem('allTypes', JSON.stringify(allTypes));
            }
            let subTypesOfType = JSON.parse(localStorage.getItem(currentStage));
            let expensesOfType = JSON.parse(
                localStorage.getItem(`${currentStage}-expenses`)
            );
            const id = allTypes[0].id;
            if (!subTypesOfType) {
                subTypesOfType = await getSubtypesByType({ typeID: id });
                localStorage.setItem(
                    currentStage,
                    JSON.stringify(subTypesOfType)
                );
            }
            if (!expensesOfType) {
                expensesOfType = await getTypeExpenses({ typeID: id });
                localStorage.setItem(
                    `${currentStage}-expenses`,
                    JSON.stringify(expensesOfType)
                );
            }
            subTypes[currentStage] = subTypesOfType;
            expenses[currentStage] = expensesOfType;
            this.setState({
                loading: false,
                types: allTypes,
                subTypes,
                expenses
            });
        } catch (e) {
            errorToast();
        }
    }

    handleClick = async (id, name) => {
        saveProgress(this.checked).catch(() => errorToast());

        if (name === 'Breakdown') {
            this.setState({ currentStage: name });
            return;
        }
        const { subTypes, expenses } = this.state;
        if (!expenses[name]) {
            let expensesOfType = JSON.parse(
                localStorage.getItem(`${name}-expenses`)
            );
            if (!expensesOfType) {
                expensesOfType = await getTypeExpenses({ typeID: id });
                localStorage.setItem(
                    `${name}-expenses`,
                    JSON.stringify(expensesOfType)
                );
            }
            expenses[name] = expensesOfType;
        }
        if (!subTypes[name]) {
            let subTypesOfType = JSON.parse(localStorage.getItem(name));
            if (!subTypesOfType) {
                try {
                    subTypesOfType = await getSubtypesByType({ typeID: id });
                    localStorage.setItem(name, JSON.stringify(subTypesOfType));
                } catch (e) {
                    errorToast();
                }
            }
            subTypes[name] = subTypesOfType;
            this.setState({ subTypes, currentStage: name, expenses });
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
        const { currentStage, subTypes, expenses } = this.state;
        if (currentStage === 'Breakdown') {
            return <Breakdown />;
        } else {
            return (
                <Type
                    handleSelection={this.handleSelection}
                    title={currentStage}
                    subTypes={subTypes[currentStage]}
                    expenses={expenses[currentStage]}
                    checked={this.checked}
                />
            );
        }
    };

    handleNext = () => {
        const { types } = this.state;
        const currentName = types.findIndex(
            x => x.name === this.state.currentStage
        );
        this.handleClick(
            types[currentName + 1].id,
            types[currentName + 1].name
        );
    };

    handlePrevious = () => {
        const { types } = this.state;
        const currentName = types.findIndex(
            x => x.name === this.state.currentStage
        );
        this.handleClick(
            types[currentName - 1].id,
            types[currentName - 1].name
        );
    };

    render() {
        const { loading, currentStage, types } = this.state;
        const lastCategory = currentStage === 'Breakdown';
        const firstCategory = types[0] ? types[0].name === currentStage : false;
        return (
            <div>
                <div>
                    <NavBar>
                        <FirstChevron />
                        {loading ? <>Loading...</> : this.renderList()}
                    </NavBar>
                    {loading ? <>Loading...</> : this.renderType()}
                </div>
                <Buttons>
                    {!firstCategory ? (
                        <Button
                            text="< Previous"
                            onClick={() => this.handlePrevious()}
                        />
                    ) : null}
                    {!lastCategory ? (
                        <Button text="Next >" onClick={() => this.handleNext()} />
                    ) : null}
                </Buttons>
            </div>
        );
    }
}

export default Calculator;
