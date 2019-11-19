import React from 'react';
import { auth } from 'firebase';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';

import { createUser } from '../repository';

const SignUpContainer = styled.div`
    border: 45px solid ${COLOURS.darkblue};
    align-items: center;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    min-height: 350px;
    background-color: ${COLOURS.darkblue};
`;

const SignUpInfo = styled.input`
    color: ${COLOURS.darkPrimary};
    background-color: ${COLOURS.lightPrimary};
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
    width: 180px;
    padding: 10px;
    border: none;
    border-radius: 8px;
    margin-bottom: 1.2em;
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

class SignUp extends React.Component {
    state = {
        displayName: '',
        email: '',
        password: ''
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

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async result => {
                try {
                    await createUser({ uid: result.user.uid, email });
                    await result.user.updateProfile({ displayName });
                } catch (e) {
                    console.log(e);
                    alert('something went wrong');
                }
            })
            .catch(error => {
                alert('something went wrong');
            });
    };

    render() {
        const { displayName, email, password } = this.state;

        return (
            <SignUpContainer>
                <FormContainer>
                    <Title>New User?</Title>
                    <Subtitle>Sign up to get started</Subtitle>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <SignUpInfo
                                name="displayName"
                                type="text"
                                placeholder="Full Name"
                                value={displayName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <SignUpInfo
                                name="email"
                                type="text"
                                value={email}
                                placeholder="E-mail"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <SignUpInfo
                                name="password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <SignUpButton type="submit" value="Sign Up" />
                    </form>
                </FormContainer>
            </SignUpContainer>
        );
    }
}

export default SignUp;
