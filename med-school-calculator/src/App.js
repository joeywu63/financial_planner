import React from 'react';

import * as firebase from 'firebase';

import Home from 'apps/Login/components/Home';
import Dashboard from 'apps/Dashboard/components/Dashboard';

import { getCurrentUser, setCurrentUser } from 'utils/currentUser';
import * as userModel from 'model/user';

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
                    const userRole = (await userModel.get({ uid: user.uid }))
                        .role;

                    const currentUser = {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        role: userRole
                    };
                    setCurrentUser(currentUser);
                    this.setState({ isSignedIn: true, loading: false });
                } catch (e) {
                    alert('something went wrong');
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
            <div>Loading...</div>
        ) : isSignedIn && currentUser ? (
            <Dashboard />
        ) : (
            <Home/>
        );
    }
}

export default App;
