import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
    border-radius: 2px;
    border-width: 1px;
    border-color: grey;
    padding: 2px;
    width: 95%;
`;

const Input = ({ className, type, name, value, placeholder, onChange }) => {
    return (
        <StyledInput
            className={className}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
    type: 'text',
    placeholder: ''
};

export default Input;
