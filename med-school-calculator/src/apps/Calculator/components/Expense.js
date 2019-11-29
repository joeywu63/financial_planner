import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import InfoTooltip from 'common/InfoTooltip';
import { getAlternativesByExpense } from '../repository';
import Alternative from './Alternative';
import info_icon from 'img/question-mark-icon.png';
import { errorToast } from 'utils/helpers';

const AltTitleDiv = styled.div`
    font-weight: bold;
    margin-left: 30px;
`;

class Expense extends React.Component {
    async componentDidMount() {
        try {
            const data = await getAlternativesByExpense({
                expenseID: this.props.id
            });
            this.setState({ loading: false, alternatives: data });

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
                <div>
                    <AltTitleDiv>Alternative options:</AltTitleDiv>
                    {alternatives.map(alt => (
                        <Alternative
                            key={alt.id}
                            id={alt.id}
                            name={alt.name}
                            description={alt.description}
                            cost={alt.cost}
                            checked={this.props.checkedItems.has(alt.id)}
                            onChange={this.props.onChange}
                        />
                    ))}
                </div>
            );
        }
    };

    render() {
        const { loading, checked, alternatives } = this.state;
        const { name, description, cost } = this.props;
        return (
            <div>
                <form>
                    <Grid columns={'20px 45px auto'}>
                        <Cell>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={this.handleChange}
                            />
                        </Cell>
                        <Cell>{`$${cost}`}</Cell>
                        <Cell>
                            {`${name} `}
                            {description ? (
                                <InfoTooltip
                                    hoverMessage={description}
                                    trigger={
                                        <img
                                            src={`${info_icon}`}
                                            width="15"
                                            height="15"
                                        />
                                    }
                                />
                            ) : (
                                ''
                            )}
                        </Cell>
                    </Grid>
                </form>
                {loading ? (
                    <>Loading...</>
                ) : (
                    this.renderAlternatives(alternatives)
                )}
            </div>
        );
    }
}

Expense.propTypes = {
    checked: PropTypes.bool
};

export default Expense;
