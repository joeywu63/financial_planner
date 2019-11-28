import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {COLOURS} from '../utils/constants';

const StyledButton = styled.input`
    height: 35px;
    font-size: 16px;
    font-weight: 500;
    background-color: ${COLOURS.darkblue};
    color: ${COLOURS.white};
    text-align: center;
    border-radius: 8px;
    border-width: 0;
    padding: 0 0.9em;
    margin: 0.15em;
    cursor: pointer;
    :hover {
        background-color: ${COLOURS.lightgrey};
    }
`;

class SubmitButton extends React.Component {
    render() {
        const { value } = this.props;

        return <StyledButton type="submit" value={value}></StyledButton>
    }
}

SubmitButton.propTypes = {
    value: PropTypes.string.isRequired
};

export default SubmitButton;