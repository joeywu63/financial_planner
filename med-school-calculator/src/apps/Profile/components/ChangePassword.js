import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';
import styled from 'styled-components';

import { getCurrentUser } from 'utils/currentUser';
import SubmitButton from 'common/SubmitButton';
import Button from 'common/Button';
import Input from 'common/Input';
import { PROFILEPAGES } from '../constants';

import { successToast, errorToast } from 'utils/helpers';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ShortInput = styled(Input)`
    width: 400px;
`;

const PasswordHeader = styled.div`
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
    margin-top: 15px;
`;

class ChangePassword extends React.Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    handleChange = event => {
        const key = event.target.getAttribute('name');
        const value = event.target.value;

        this.setState({
            [key]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.newPassword === this.state.confirmNewPassword) {
            const credential = auth.EmailAuthProvider.credential(
                getCurrentUser().email,
                this.state.oldPassword
            );
            auth()
                .currentUser.reauthenticateWithCredential(credential)
                .then(() => {
                    return auth().currentUser.updatePassword(
                        this.state.newPassword
                    );
                })
                .then(() => {
                    successToast('Password changed successfully');
                    this.props.handleSwitchPage(PROFILEPAGES.default);
                })
                .catch(err => {
                    errorToast();
                });
        } else {
            errorToast('Passwords do not match');
        }
    };

    render() {
        return (
            <>
                <PasswordHeader>Edit Password</PasswordHeader>
                <StyledForm onSubmit={this.handleSubmit}>
                    <div>Old Password:</div>
                    <ShortInput
                        type="password"
                        name="oldPassword"
                        value={this.state.oldPassword}
                        onChange={this.handleChange}
                    />
                    <div>New Password:</div>
                    <ShortInput
                        type="password"
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange}
                    />
                    <div>Confirm New Password:</div>
                    <ShortInput
                        type="password"
                        name="confirmNewPassword"
                        value={this.state.confirmNewPassword}
                        onChange={this.handleChange}
                    />
                    <div>
                        <StyledButton
                            onClick={() =>
                                this.props.handleSwitchPage(
                                    PROFILEPAGES.default
                                )
                            }
                            text="Cancel"
                        />
                        <SubmitButton value="Submit" />
                    </div>
                </StyledForm>
            </>
        );
    }
}

ChangePassword.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangePassword;
