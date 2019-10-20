import React from 'react';
import { auth } from 'firebase';

import Button from 'common/Button';

class Dashboard extends React.Component {
    handleLogOut = () => {
        auth()
            .signOut()
            .catch(error => alert('Something went wrong'));
    };

    render() {
        return (
            <div>
                <Button text="Logout" onClick={this.handleLogOut} />
                Dashboard
            </div>
        );
    }
}

export default Dashboard;
