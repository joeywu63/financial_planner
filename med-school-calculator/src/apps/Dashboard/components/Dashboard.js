import React from 'react';
import { auth } from 'firebase';
import { Redirect, BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import NavigationBar from "common/NavigationBar";
import Admin from 'apps/Admin/components/Admin';
import Profile from 'apps/Profile/components/Profile';
import Calculator from 'apps/Calculator/components/Calculator';
import About from 'apps/About/components/About';
import PageWrapper from 'common/PageWrapper';

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
                    <NavigationBar handleLogOut={this.handleLogOut}/>

                    <PageWrapper>
                        <Switch>
                            <Route path='/admin' component={Admin} />
                            <Route path='/profile' component={Profile} />
                            <Route path='/calculator' component={Calculator} />
                            <Route path='/about' component={About} />
                            <Redirect to='/calculator' />
                        </Switch>
                    </PageWrapper>
                </Router>
            </div>
        );
    }
}

export default Dashboard;
