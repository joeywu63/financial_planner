import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOURS } from '../utils/constants';

const StyledButton = styled.button`
    height: 30px;
    font-size: 14px;
    font-weight: 500;
    background-color: ${COLOURS.blue};
    color: ${COLOURS.white};
    text-align: center;
    border-width: 0;
    padding: 0 0.5em;
    margin: 0.15em;
    cursor: pointer;
    :hover {
        background-color: ${COLOURS.lightgrey};
    }
`;

class Button extends React.Component {
    render() {
        const { text, onClick, className } = this.props;

        return (
            <StyledButton type="button" className={className} onClick={onClick}>
                {text}
            </StyledButton>
        );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Button;
