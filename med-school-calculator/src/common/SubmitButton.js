import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOURS } from '../utils/constants';

const StyledButton = styled.input`
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

class SubmitButton extends React.Component {
    render() {
        const { value } = this.props;

        return <StyledButton type="submit" value={value} />;
    }
}

SubmitButton.propTypes = {
    value: PropTypes.string.isRequired
};

export default SubmitButton;
