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
    getTypeExpenses,
    getExpense,
    getAlternative
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

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Subtitle = styled.h2`
    color: ${COLOURS.darkblue};
    font-weight: 400;
    font-size: 30px;
`;

class Calculator extends React.Component {
    state = {
        loading: true,
        currentStage: 'MCAT',
        types: [],
        subTypes: {},
        expenses: {},
        total: 0
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
            let sum = 0;
            for (const id of this.checked) {
                try {
                    const expense = await getExpense({ expenseID: id });
                    if (expense !== undefined) {
                        sum += expense.cost;
                    } else {
                        const alt = await getAlternative({ alternativeID: id });
                        sum += alt.cost;
                    }
                } catch (error) {
                    const removedInvalid = [...this.checked].filter(
                        item => item !== id
                    );
                    saveProgress(removedInvalid).catch(() => {
                        errorToast();
                    });
                    errorToast();
                    continue;
                }
            }
            Promise.all(this.checked)
                .then(res => this.setState({ total: sum }))
                .catch(() => errorToast());
        } catch (e) {
            errorToast();
        }
    }

    handleSelection = (expense, wasChecked) => {
        const { total } = this.state;
        if (wasChecked) {
            if (!this.checked.has(expense.id)) {
                this.checked.add(expense.id);
                this.setState({ total: total + expense.cost });
            }
        } else {
            this.checked.delete(expense.id);
            this.setState({ total: total - expense.cost });
        }
    };

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
        const { currentStage, subTypes, expenses, total } = this.state;
        if (currentStage === 'Breakdown') {
            return <Breakdown types={this.state.types} />;
        } else {
            return (
                <Type
                    handleSelection={this.handleSelection}
                    title={currentStage}
                    subTypes={subTypes[currentStage]}
                    expenses={expenses[currentStage]}
                    checked={this.checked}
                    total={total}
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
        const { loading, currentStage, types, total } = this.state;
        const lastCategory = currentStage === 'Breakdown';
        const firstCategory = types[0] ? types[0].name === currentStage : false;
        return (
            <PageWrapper>
                <div>
                    <NavBar>
                        <FirstChevron />
                        {loading ? <>Loading...</> : this.renderList()}
                    </NavBar>
                    {loading ? <>Loading...</> : this.renderType()}
                </div>
                <Subtitle>Total Cost: ${total}</Subtitle>
                <Buttons>
                    {!firstCategory ? (
                        <Button
                            text="< Previous"
                            onClick={() => this.handlePrevious()}
                        />
                    ) : null}
                    {!lastCategory ? (
                        <Button
                            text="Next >"
                            onClick={() => this.handleNext()}
                        />
                    ) : null}
                </Buttons>
            </PageWrapper>
        );
    }
}

export default Calculator;
