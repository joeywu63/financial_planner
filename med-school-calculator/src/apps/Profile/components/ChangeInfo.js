import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';
import styled from 'styled-components';

import { getCurrentUser } from 'utils/currentUser';
import Button from 'common/Button';
import Input from 'common/Input';
import SubmitButton from 'common/SubmitButton';
import { PROFILEPAGES } from '../constants';
import { successToast, errorToast } from 'utils/helpers';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ShortInput = styled(Input)`
    width: 400px;
`;

const InfoHeader = styled.div`
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
    margin-top: 15px;
`;

class ChangeInfo extends React.Component {
    state = {
        displayName: getCurrentUser().displayName,
        email: getCurrentUser().email
    };

    handleChange = event => {
        const key = event.target.getAttribute('name');
        this.setState({
            [key]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = auth().currentUser;

        let updates = [
            user.updateProfile({
                displayName: this.state.displayName
            }),
            user.updateEmail(this.state.email)
        ];

        Promise.all(updates)
            .then(() => {
                //TODO: update current user
                successToast('Profile updated successfully');
                this.props.handleSwitchPage(PROFILEPAGES.default);
            })
            .catch(
                //TODO: error handling, reauthenticate
                () => {
                    errorToast();
                }
            );
    };

    render() {
        return (
            <>
                <InfoHeader>Edit Profile</InfoHeader>
                <StyledForm onSubmit={this.handleSubmit}>
                    <div>Name:</div>
                    <ShortInput
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
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
                                this.props.handleSwitchPage(
                                    PROFILEPAGES.default
                                )
                            }
                            text="Cancel"
                        />
                    </div>
                </StyledForm>
            </>
        );
    }
}

ChangeInfo.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangeInfo;
