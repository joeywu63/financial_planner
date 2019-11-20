import React from 'react';
import styled from 'styled-components';
import Login from './Login';
import SignUp from 'apps/SignUp/components/SignUp';
import { COLOURS } from 'utils/constants';
import img from 'img/home_background.jpg';

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100vh;
    min-height: 100vh;
    background: url(${img});
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 32px;
    color: ${COLOURS.white};
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 1.5em;
    margin-top: 0.2em;
`;

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    border-radius: 6px;
    min-width: 650px;
    min-height: 450px;
    box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);
    border: 1px none;
`;

const LoginRegister = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
`;

class Home extends React.Component {
    render() {
        return (
            <HomeWrapper>
                <Title>
                    Estimate the cost of applying to medical schools in Canada.
                </Title>
                <StyledPanel>
                    <LoginRegister>
                        <SignUp cancel={this.toggleSignUp} />
                        <Login handleSignUp={this.toggleSignUp} />
                    </LoginRegister>
                </StyledPanel>
            </HomeWrapper>
        );
    }
}

export default Home;
