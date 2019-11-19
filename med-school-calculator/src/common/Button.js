import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
    height: 20px;
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