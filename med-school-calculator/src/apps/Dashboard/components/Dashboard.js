import React from 'react';
import { auth } from 'firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Admin from 'apps/Admin/components/Admin';
import Profile from 'apps/Profile/components/Profile';
import Calculator from 'apps/Calculator/components/Calculator';

import Button from 'common/Button';
import RouterButton from 'common/RouterButton';
import PageWrapper from 'common/PageWrapper';

import { hasAdminAccess } from 'utils/helpers';

class Dashboard extends React.Component {
    handleLogOut = () => {
        auth()
            .signOut()
            .catch(error => alert('Something went wrong'));
    };

    render() {
        return (
            <div>
                <Router>
                    <RouterButton link="/calculator/Welcome" title="Calculator" />
                    <RouterButton link="/profile" title="Profile" />
                    {hasAdminAccess() && (
                        <RouterButton link="/admin" title="Admin" />
                    )}
                    <Button text="Logout" onClick={this.handleLogOut} />
                    <PageWrapper>
                        <Switch>
                            <Route path="/admin" component={Admin} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/calculator" component={Calculator} />
                        </Switch>
                    </PageWrapper>
                </Router>
            </div>
        );
    }
}

export default Dashboard;
