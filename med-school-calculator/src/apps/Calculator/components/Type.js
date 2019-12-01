import React from 'react';
import styled from 'styled-components';
import Subtype from './Subtype';
import { getExpense, getAlternative, saveProgress } from '../repository';
import { errorToast } from 'utils/helpers';
import { COLOURS } from 'utils/constants';

const TypeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-top: 15px;
    padding-bottom: 15px;
    border-top: 2px solid ${COLOURS.darkblue};
    border-bottom: 2px solid ${COLOURS.darkblue};
`;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    color: ${COLOURS.darkblue};
    font-weight: 500;
    font-size: 40px;
`;

const Subtitle = styled.h2`
    color: ${COLOURS.darkblue};
    font-weight: 400;
    font-size: 30px;
`;

class Type extends React.Component {
    state = {
        subtypes: [],
        total: 0
    };

    async componentDidMount() {
        const { checked } = this.props;

        let sum = 0;
        for (const id of checked) {
            try {
                const expense = await getExpense({ expenseID: id });
                if (expense !== undefined) {
                    sum += expense.cost;
                } else {
                    const alt = await getAlternative({ alternativeID: id });
                    sum += alt.cost;
                }
            } catch (error) {
                const removedInvalid = [...checked].filter(item => item !== id);
                saveProgress(removedInvalid).catch(() => {
                    errorToast();
                });
                errorToast();
                continue;
            }
        }
        Promise.all(checked)
            .then(res => this.setState({ total: sum }))
            .catch(() => errorToast());
    }

    handleSelection = (expense, wasChecked) => {
        const { checked } = this.props;
        const { total } = this.state;
        if (wasChecked) {
            if (!checked.has(expense.id)) {
                this.setState({ total: total + expense.cost });
            }
        } else {
            this.setState({ total: total - expense.cost });
        }
        this.props.handleSelection(expense, wasChecked);
    };

    renderList = subtypes => {
        return (
            <TypeWrapper>
                {subtypes.map(subtype => (
                    <Subtype
                        handleSelection={this.handleSelection}
                        key={subtype.id}
                        id={subtype.id}
                        title={subtype.name}
                        checked={this.props.checked}
                    />
                ))}
            </TypeWrapper>
        );
    };

    render() {
        const { subTypes } = this.props;
        return (
            <PageWrapper>
                <Title>{this.props.title}</Title>
                {this.renderList(subTypes)}
                <Subtitle>Total so far: ${this.state.total}</Subtitle>
            </PageWrapper>
        );
    }
}

export default Type;
