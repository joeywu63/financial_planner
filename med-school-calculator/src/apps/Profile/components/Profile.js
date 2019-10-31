import React from 'react';

import { getCurrentUser } from 'utils/currentUser';
import { PROFILEPAGES } from '../constants';
import Button from 'common/Button';
import ChangeInfo from './ChangeInfo';
import ChangePassword from './ChangePassword';

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
                <div>Profile</div>
                Name: {displayName}
                Email: {email}
                <Button
                    text="Edit Profile"
                    onClick={() => this.handleSwitchPage(PROFILEPAGES.changeinfo)}
                />
                <Button
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
                    <ChangePassword handleSwitchPage={this.handleSwitchPage}/>
                ) : page === PROFILEPAGES.changeinfo ? (
                    <ChangeInfo handleSwitchPage={this.handleSwitchPage}/>
                ) : null}
            </>
        );
    }
}

export default Profile;