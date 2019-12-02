import React from 'react';
import { auth } from 'firebase';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';
import Button from 'common/Button';
import SubmitButton from 'common/SubmitButton';
import { successToast, errorToast } from 'utils/helpers';

const Popup = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-content: center
    align-items: center
    justify-content: center
`;

const PopupInner = styled.div`
    width: 600px;
    height: 300px;
    margin: auto;  
    background: white;  
    display: flex;
    flex-direction: column;
    align-content: center
    align-items: center
    justify-content: center
`;

const StyledButton = styled(Button)`
    width: 190px;
    margin-top: 10px;
`;

const StyledInput = styled.input`
    margin-top: 10px;
    margin-bottom: 15px;
    width: 450px;
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 24px;
    color: ${COLOURS.darkgrey};
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 30px;
    margin-top: 0.2em;
`;

const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center
    align-items: center
    justify-content: center
`;

class ForgotPassword extends React.Component {
    state = {
        email: ''
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
        auth()
            .sendPasswordResetEmail(this.state.email)
            .then(() => {
                successToast('Please Check Email For Password Reset');
            })
            .catch(err => {
                errorToast();
            });
    };

    render() {
        return (
            <Popup>
                <PopupInner>
                    <Title>Account Recovery</Title>
                    Please Enter the Email Address Associated With Your Account:
                    <form onSubmit={this.handleSubmit}>
                        <StyledInput
                            name="email"
                            type="text"
                            placeholder="E-mail"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <CenteredDiv>
                            <SubmitButton value="Send Verification Email" />
                        </CenteredDiv>
                        <CenteredDiv>
                            <StyledButton
                                onClick={this.props.closePopup}
                                text="Cancel"
                            />
                        </CenteredDiv>
                    </form>
                </PopupInner>
            </Popup>
        );
    }
}

export default ForgotPassword;
