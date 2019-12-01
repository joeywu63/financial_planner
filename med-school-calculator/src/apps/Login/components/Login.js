import React from 'react';
import { auth } from 'firebase';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';

import { errorToast } from 'utils/helpers';

const LoginContainer = styled.div`
    align-items: center;
    border: 45px solid ${COLOURS.white};
    border-left: 65px solid ${COLOURS.white};
    border-right: 65px solid ${COLOURS.white};
    background: white;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    background-color: ${COLOURS.white};
`;

const LoginInfo = styled.input`
    color: white;
    background-color: #bfc0c0;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
    width: 250px;
    padding: 10px;
    border: none;
    border-radius: 8px;
    margin-bottom: 1.2em;
`;

const LoginButton = styled.input`
    width: 270px;
    font-weight: 500;
    text-align: center;
    font-size: 16px;
    color: ${COLOURS.darkblue};
    background-color: ${COLOURS.lightorange};
    border: none;
    border-radius: 8px;
    padding: 0.8em;
    margin-top: 72px;
    margin-bottom: 1em;
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
    color: ${COLOURS.darkgrey};
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 0.1em;
    margin-top: 0.2em;
`;

const Subtitle = styled.h3`
    font-weight: 300;
    font-size: 18px;
    color: ${COLOURS.darkgrey};
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 2.4em;
    margin-top: 0.2em;
`;

class Login extends React.Component {
    state = {
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
        const { email, password } = this.state;

        auth()
            .signInWithEmailAndPassword(email, password)
            .catch(() => errorToast('Incorrect email or password'));
    };

    render() {
        const { email, password } = this.state;

        return (
            <LoginContainer>
                <FormContainer onSubmit={this.handleSubmit}>
                    <Title>Welcome Back.</Title>
                    <Subtitle>Sign in to continue</Subtitle>
                    <LoginInfo
                        name="email"
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <LoginInfo
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <LoginButton type="submit" value="Sign In" />
                </FormContainer>
            </LoginContainer>
        );
    }
}

export default Login;
