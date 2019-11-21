import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { COLOURS } from 'utils/constants';

const StyledButton = styled.button`
    border-width: 0;
    border-radius: 2px;
    padding: 5px;
    color: ${COLOURS.offWhite}
    :hover {
        color: black;
    }
`;

const IconButton = ({ className, name, onClick }) => {
    return (
        <StyledButton onClick={onClick} className={className}>
            <FontAwesomeIcon icon={name} size="2x" />
        </StyledButton>
    );
};

IconButton.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default IconButton;