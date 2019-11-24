import React from 'react';
import { auth } from 'firebase';

import NavigationBar from "../../../common/NavigationBar";

class Dashboard extends React.Component {
    handleLogOut = () => {
        auth()
            .signOut()
            .catch(error => alert('Something went wrong'));
    };

    render() {
        return (
            <div>
                <NavigationBar handleLogOut={this.handleLogOut}/>
            </div>
        );
    }
}

export default Dashboard;
