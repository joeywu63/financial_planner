import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';
import styled from 'styled-components';

import SubmitButton from 'common/SubmitButton';
import Button from 'common/Button';
import Input from 'common/Input';
import { PROFILEPAGES } from '../constants';

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

        if (this.state.newPassword == this.state.confirmNewPassword) {
            auth()
                .currentUser.updatePassword(this.state.newPassword)
                .then(() => {
                    window.alert('Password changed successfully');
                    this.props.handleSwitchPage(PROFILEPAGES.default);
                })
                .catch(err => {
                    // TODO: error handling, reauthenticate
                    console.log(err);
                    window.alert('Something went wrong');
                });
        } else {
            // TODO: display password reqs
            window.alert('Passwords do not match');
        }
    };

    render() {
        return (
            <>
                <PasswordHeader>Edit Password</PasswordHeader>
                <form onSubmit={this.handleSubmit}>
                    <div>New Password:</div>
                    <ShortInput
                        type="password"
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange}
                    ></ShortInput>
                    <div>Confirm New Password:</div>
                    <ShortInput
                        type="password"
                        name="confirmNewPassword"
                        value={this.state.confirmNewPassword}
                        onChange={this.handleChange}
                    ></ShortInput>
                </form>
                <SubmitButton value="Submit" />
                <StyledButton
                    onClick={() =>
                        this.props.handleSwitchPage(PROFILEPAGES.default)
                    }
                    text="Cancel"
                />
            </>
        );
    }
}

ChangePassword.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangePassword;
