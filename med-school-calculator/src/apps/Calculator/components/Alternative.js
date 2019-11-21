import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from "styled-css-grid";
import PropTypes from 'prop-types';
import InfoTooltip from 'common/InfoTooltip';
import info_icon from 'img/question-mark-icon.png';

const AltDiv = styled.div`
    margin-left: 30px;
`;

class Alternative extends React.Component {
    state = { checked: false };

    handleChange = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked });
        this.props.onChange(this.props, !checked);
    };

    render() {
        const { checked } = this.state;
        const { name, description, cost } = this.props;
        return (
            <AltDiv>
                <Grid columns={"20px 45px auto"}>
                    <Cell>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={this.handleChange}
                        ></input>
                    </Cell>
                    <Cell>{`$${cost}`}</Cell>
                    <Cell>
                        {`${name} `}
                        {description ?
                            <InfoTooltip
                                hoverMessage={description}
                                trigger={<img src={`${info_icon}`} width="15" height="15"/>}
                            ></InfoTooltip> : ""}
                    </Cell>
                </Grid>
            </AltDiv>
        );
    }
}

Alternative.propTypes = {
    cost: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Alternative;