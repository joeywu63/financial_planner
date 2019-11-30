import React from 'react';
import styled from 'styled-components';

import { getCurrentUser } from 'utils/currentUser';
import { PROFILEPAGES } from '../constants';
import Button from 'common/Button';
import ChangeInfo from './ChangeInfo';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const ProfileHeader = styled.div`
    font-weight: bold;
    font-size: 25px;
`;

const ProfileLine = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
`;

const ProfileCategories = styled.text`
    font-weight: bold;
`;

const StyledButton = styled(Button)`
    margin-top: 15px;
`;

class Profile extends React.Component {
    state = {
        currentUser: getCurrentUser(),
        page: PROFILEPAGES.default
    };

    handleSwitchPage = page => {
        this.setState({ page });
    };

    renderProfileInfo = () => {
        const { displayName, email } = this.state.currentUser;

        return (
            <>
                <ProfileHeader>Profile</ProfileHeader>
                <ProfileLine>
                    <ProfileCategories>Name:</ProfileCategories> {displayName}
                </ProfileLine>
                <StyledButton
                    text="Edit Profile"
                    onClick={() =>
                        this.handleSwitchPage(PROFILEPAGES.changeinfo)
                    }
                />
                <ProfileLine>
                    <ProfileCategories>Email:</ProfileCategories> {email}
                </ProfileLine>
                <StyledButton
                    text="Edit Email"
                    onClick={() =>
                        this.handleSwitchPage(PROFILEPAGES.changeemail)
                    }
                />
                <StyledButton
                    text="Edit Password"
                    onClick={() =>
                        this.handleSwitchPage(PROFILEPAGES.changepassword)
                    }
                />
            </>
        );
    };

    render() {
        const { page } = this.state;
        return (
            <>
                {page === PROFILEPAGES.default ? (
                    this.renderProfileInfo()
                ) : page === PROFILEPAGES.changepassword ? (
                    <ChangePassword handleSwitchPage={this.handleSwitchPage} />
                ) : page === PROFILEPAGES.changeemail ? (
                    <ChangeEmail handleSwitchPage={this.handleSwitchPage}/>
                ) : page === PROFILEPAGES.changeinfo ? (
                    <ChangeInfo handleSwitchPage={this.handleSwitchPage} />
                ) : null}
            </>
        );
    }
}

export default Profile;
