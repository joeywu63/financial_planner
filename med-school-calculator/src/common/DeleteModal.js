import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const Wrapper = styled.div`
    height: 85%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

class DeleteModal extends React.Component {
    state = {
        deleteName: ''
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    handleDelete = () => {
        const { deleteConfirmationName, onDelete, onRequestClose } = this.props;
        const { deleteName } = this.state;

        if (deleteConfirmationName === deleteName) {
            onDelete();
            onRequestClose();
        }
    };

    render() {
        const { onRequestClose, isOpen, deleteConfirmationName } = this.props;
        const { deleteName } = this.state;

        return (
            <Modal onRequestClose={onRequestClose} isOpen={isOpen}>
                <Wrapper>
                    <div>
                        {`Please type ${deleteConfirmationName} to confirm deletion.`}
                        <Input
                            onChange={this.handleChange}
                            value={deleteName}
                            name="deleteName"
                        />
                    </div>
                    <Button text="Delete" onClick={this.handleDelete} />
                </Wrapper>
            </Modal>
        );
    }
}

DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleteConfirmationName: PropTypes.string.isRequired
};

export default DeleteModal;
