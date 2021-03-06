import React from 'react';
import styled from 'styled-components';

import * as firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from 'apps/Login/components/Home';
import Dashboard from 'apps/Dashboard/components/Dashboard';

import { getCurrentUser, setCurrentUser } from 'utils/currentUser';
import { errorToast } from 'utils/helpers';
import * as userModel from 'model/user';

import Spinner from 'common/Spinner';

library.add(fas);
toast.configure();
const firebaseConfig = {
    apiKey: 'AIzaSyC4FMchr26grG-r3mrD2eKgauRl2alaBNQ',
    authDomain: 'med-school-calculator.firebaseapp.com',
    databaseURL: 'https://med-school-calculator.firebaseio.com',
    projectId: 'med-school-calculator',
    storageBucket: 'med-school-calculator.appspot.com',
    messagingSenderId: '774574751667',
    appId: '1:774574751667:web:a3af8e4ac728375ad955c6',
    measurementId: 'G-Z0V02F05J4'
};
firebase.initializeApp(firebaseConfig);

const StyledSpinner = styled(Spinner)`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

class App extends React.Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    state = {
        loading: true,
        isSignedIn: false
    };

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                try {
                    const u = await userModel.get({ uid: user.uid });
                    const userRole = u.role;
                    const progress = u.progress;
                    const userVersion = u.version;

                    const currentUser = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        role: userRole,
                        progress: new Set(progress),
                        version: userVersion
                    };
                    setCurrentUser(currentUser);
                    this.setState({ isSignedIn: true, loading: false });
                } catch (e) {
                    errorToast();
                }
            } else {
                setCurrentUser(null);
                this.setState({ isSignedIn: false, loading: false });
            }
        });
    };

    render() {
        const { loading, isSignedIn } = this.state;
        const currentUser = getCurrentUser(); // we need to get current user also for security reason

        return loading ? (
            <StyledSpinner />
        ) : isSignedIn && currentUser ? (
            <Dashboard />
        ) : (
            <Home />
        );
    }
}

export default App;
