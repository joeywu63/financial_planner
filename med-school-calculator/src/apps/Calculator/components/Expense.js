import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import InfoTooltip from 'common/InfoTooltip';
import { getAlternativesByExpense } from '../repository';
import Alternative from './Alternative';
import info_icon from 'img/question-mark-icon.png';
import { errorToast } from 'utils/helpers';
import { COLOURS } from 'utils/constants';

const AltTitleDiv = styled.div`
    font-weight: bold;
    padding-left: 5px;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-left: 50px;
    color: ${COLOURS.offWhite};
`;

const Alts = styled.div`
    margin-bottom: 5px;
`;

class Expense extends React.Component {
    async componentDidMount() {
        try {
            const { id } = this.props;
            let alternatives = JSON.parse(
                localStorage.getItem(`${id}-alternatives`)
            );
            if (!alternatives) {
                alternatives = await getAlternativesByExpense({
                    expenseID: this.props.id
                });
                localStorage.setItem(
                    `${id}-alternatives`,
                    JSON.stringify(alternatives)
                );
            }
            this.setState({ loading: false, alternatives });

            if (this.props.checked) {
                this.handleChange();
            }
        } catch (e) {
            errorToast();
        }
    }

    state = { loading: true, checked: false, alternatives: [] };

    handleChange = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked });
        this.props.onChange(this.props, !checked);
    };

    renderAlternatives = alternatives => {
        if (alternatives.length !== 0) {
            return (
                <Alts>
                    <AltTitleDiv>Alternative Options:</AltTitleDiv>
                    {alternatives.map(alt => (
                        <Alternative
                            key={alt.id}
                            id={alt.id}
                            name={alt.name}
                            description={alt.description}
                            url={alt.url}
                            cost={alt.cost}
                            checked={this.props.checkedItems.has(alt.id)}
                            onChange={this.props.onChange}
                        />
                    ))}
                </Alts>
            );
        }
    };

    render() {
        const { loading, checked, alternatives } = this.state;
        const { name, description, cost } = this.props;
        return (
            <>
                <Cell width={1} center={true}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={this.handleChange}
                    />
                </Cell>
                <Cell width={1}>{`$${cost}`}</Cell>
                <Cell width={8}>
                    {`${name} `}
                    {description ? (
                        <InfoTooltip
                            hoverMessage={description}
                            trigger={
                                <img
                                    src={`${info_icon}`}
                                    width="15"
                                    height="15"
                                    alt="description"
                                />
                            }
                        />
                    ) : (
                        ''
                    )}
                </Cell>
                <Cell width={10}>
                    {loading ? (
                        <>Loading...</>
                    ) : (
                        this.renderAlternatives(alternatives)
                    )}
                </Cell>
            </>
        );
    }
}

Expense.propTypes = {
    checked: PropTypes.bool
};

export default Expense;
