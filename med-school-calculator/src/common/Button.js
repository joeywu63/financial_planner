import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {COLOURS} from "../utils/constants";

const StyledButton = styled.button`
    height: 35px;
    font-size: 16px;
    font-weight: 500;
    background-color: ${COLOURS.buttonblue};
    color: ${COLOURS.white};
    text-align: center;
    border-radius: 8px;
    padding: 0 0.9em;
    margin: 0.15em;
    cursor: pointer;
    :hover {
        background-color: ${COLOURS.greyblue};
    }
`;

class Button extends React.Component {
    render() {
        const { text, onClick, className } = this.props;

        return <StyledButton type="button" className={className} onClick={onClick}>{text}</StyledButton>
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Button;