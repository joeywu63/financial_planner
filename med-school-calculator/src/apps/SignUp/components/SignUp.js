import React from 'react';
import { auth } from 'firebase';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';
import isEmail from 'validator/lib/isEmail';

import { createUser } from '../repository';
import { errorToast } from 'utils/helpers';

const SignUpContainer = styled.div`
    border: 45px solid ${COLOURS.blue};
    align-items: center;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-content: center;
    min-height: 390px;
    background-color: ${COLOURS.blue};
`;

const SignUpInfo = styled.input`
    color: ${COLOURS.darkPrimary};
    background-color: ${COLOURS.lightPrimary};
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
    width: 180px;
    padding: 10px;
    border: ${props => props.error ? 'solid 1px red' : 'none'};
    border-radius: 8px;
    margin-bottom: ${props => props.error ? '0px' : '1.5em'};
`;

const SignUpButton = styled.input`
    width: 200px;
    font-weight: 500;
    text-align: center;
    font-size: 16px;
    color: ${COLOURS.darkblue};
    background-color: ${COLOURS.lightorange};
    border: none;
    border-radius: 8px;
    padding: 0.8em;
    margin-top: 1em;
    margin-bottom: 1.6em;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    :hover {
        background-color: ${COLOURS.lightgrey};
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
        transform: translateY(-5px);
        position: relative;
        z-index: 1;
    }
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 24px;
    color: ${COLOURS.white};
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 0.1em;
    margin-top: 0.2em;
`;

const Subtitle = styled.h3`
    font-weight: 300;
    color: ${COLOURS.white};
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 2.4em;
    margin-top: 0.2em;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
`;

class SignUp extends React.Component {
    state = {
        displayName: '',
        email: '',
        password: '',
        errors: {
            displayName: '',
            email: '',
            password: ''
        }
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password } = this.state;

        if (!this.handleValidate()) {
            return;
        }

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async result => {
                try {
                    await auth().currentUser.sendEmailVerification();
                    await createUser({ uid: result.user.uid, email });
                    await result.user.updateProfile({ displayName });
                } catch (e) {
                    errorToast();
                }
            })
            .catch(() => {
                errorToast();
            });
    };

    handleValidate = () => {
        const { displayName, email, password } = this.state;
        const errors = {
            displayName: '',
            email: '',
            password: '',
            isValid: true
        };

        if (displayName.length === 0) {
            errors.displayName = 'Required *';
            errors.isValid = false;
        }

        if (!isEmail(email)) {
            errors.email = 'Invalid email format';
            errors.isValid = false;
        }

        if (email.length === 0) {
            errors.email = 'Required *';
            errors.isValid = false;
        }

        if (password.length < 6) {
            errors.password = 'Must be at least 6 characters';
            errors.isValid = false;
        }

        this.setState({ errors });
        return errors.isValid;
    };

    render() {
        const { displayName, email, password, errors } = this.state;

        return (
            <SignUpContainer>
                <FormContainer onSubmit={this.handleSubmit}>
                    <Title>New User?</Title>
                    <Subtitle>Sign up to get started</Subtitle>
                    <SignUpInfo
                        name="displayName"
                        type="text"
                        placeholder="Full Name *"
                        value={displayName}
                        onChange={this.handleChange}
                        error={errors.displayName}
                    />
                    {errors.displayName && (
                        <ErrorMessage>{errors.displayName}</ErrorMessage>
                    )}
                    <SignUpInfo
                        name="email"
                        type="text"
                        value={email}
                        placeholder="E-mail *"
                        onChange={this.handleChange}
                        error={errors.email}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                    )}
                    <SignUpInfo
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Password *"
                        onChange={this.handleChange}
                        error={errors.password}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password}</ErrorMessage>
                    )}
                    <SignUpButton type="submit" value="Sign Up" />
                </FormContainer>
            </SignUpContainer>
        );
    }
}

export default SignUp;
