import React from 'react';
import styled from 'styled-components';
import Subtype from './Subtype';
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

class Type extends React.Component {
    state = {
        subTypes: [],
        expenses: []
    };

    async componentDidMount() {
    }

    handleSelection = (expense, wasChecked) => {
        const { checked, total } = this.props;
        if (wasChecked) {
            if (!checked.has(expense.id)) {
                this.setState({ total: total + expense.cost });
            }
        } else {
            this.setState({ total: total - expense.cost });
        }
        this.props.handleSelection(expense, wasChecked);
    };

    renderList = (subtypes, expenses) => {
        const { title } = this.props;
        if (expenses.length !== 0) {
            const newSubtype = {
                id: null,
                name: 'Miscellaneous',
                key: `${title}-Miscellanous`,
                typeID: subtypes[0].typeID
            };
            subtypes = subtypes.concat([newSubtype]);
        }
        return (
            <TypeWrapper>
                {subtypes.map(subtype => (
                    <Subtype
                        handleSelection={this.handleSelection}
                        key={subtype.id || subtype.key}
                        expenses={subtype.id === null ? expenses: null}
                        id={subtype.id}
                        title={subtype.name}
                        checked={this.props.checked}
                    />
                ))}
            </TypeWrapper>
        );
    };

    render() {
        const { subTypes, expenses } = this.props;
        return (
            <PageWrapper>
                <Title>{this.props.title}</Title>
                {this.renderList(subTypes, expenses)}
            </PageWrapper>
        );
    }
}

export default Type;
