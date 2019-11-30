import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
`;

const customStyles = {
    content: {
        top: '100px',
        left: '200px',
        right: '200px',
        bottom: '200px'
    }
};

const Modal = ({ children, isOpen, onRequestClose }) => (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        style={customStyles}
    >
        <StyledIcon icon="times" size="1x" onClick={onRequestClose} />
        {children}
    </ReactModal>
);

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
};

export default Modal;
