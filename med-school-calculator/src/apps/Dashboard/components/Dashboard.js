import React from 'react';
import { auth } from 'firebase';
import { Redirect, Switch, Route, HashRouter } from 'react-router-dom';

import NavigationBar from 'common/NavigationBar';
import Admin from 'apps/Admin/components/Admin';
import Profile from 'apps/Profile/components/Profile';
import Calculator from 'apps/Calculator/components/Calculator';
import About from 'apps/About/components/About';
import PageWrapper from 'common/PageWrapper';

import { errorToast } from 'utils/helpers';

class Dashboard extends React.Component {
    handleLogOut = () => {
        auth()
            .signOut()
            .catch(() => errorToast());
    };

    render() {
        return (
            <div>
                <HashRouter>
                    <NavigationBar handleLogOut={this.handleLogOut} />

                    <PageWrapper>
                        <Switch>
                            <Route path="/admin" component={Admin} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/calculator" component={Calculator} />
                            <Route path="/about" component={About} />
                            <Redirect to="/calculator" />
                        </Switch>
                    </PageWrapper>
                </HashRouter>
            </div>
        );
    }
}

export default Dashboard;
