import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';
import styled from 'styled-components';

import { getCurrentUser, setCurrentUser } from 'utils/currentUser';
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
        password: '',
        email: getCurrentUser().email
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

        const credential = auth.EmailAuthProvider.credential(
            getCurrentUser().email, 
            this.state.password
        );
        auth().currentUser.reauthenticateWithCredential(credential).then(
            () => {
                return auth().currentUser.updateEmail(this.state.email);
            } 
        ).then(
            () => {
                successToast('Email updated successfully');

                let currentUser = getCurrentUser();
                currentUser.email = this.state.email;
                setCurrentUser(currentUser);

                this.props.handleSwitchPage(PROFILEPAGES.default);
            }
        ).catch(
            err => {
                errorToast();
            }
        );
    };

    render() {
        return (
            <>
                <PasswordHeader>Edit Password</PasswordHeader>
                <StyledForm onSubmit={this.handleSubmit}>
                    <div>Password:</div>
                        <ShortInput
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                    />
                    <div>Email:</div>
                    <ShortInput
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <div>
                        <SubmitButton value="Submit" />
                        <StyledButton
                            onClick={() =>
                                this.props.handleSwitchPage(PROFILEPAGES.default)
                            }
                            text="Cancel"
                        />
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
