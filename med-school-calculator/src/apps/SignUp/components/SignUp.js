import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';

import Button from 'common/Button';

import { createUser } from '../repository';

class SignUp extends React.Component {
    state = {
        displayName: '',
        email: '',
        password: ''
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password } = this.state;

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async result => {
                try {
                    await createUser({ uid: result.user.uid, email });
                    await result.user.updateProfile({ displayName });
                } catch (e) {
                    console.log(e);
                    alert('something went wrong');
                }
            })
            .catch(error => {
                alert('something went wrong');
            });
    };

    render() {
        const { cancel } = this.props;
        const { displayName, email, password } = this.state;

        return (
            <div>
                <Button onClick={cancel} text="Cancel" />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Full Name:
                        <input
                            name="displayName"
                            type="text"
                            value={displayName}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="text"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {
    cancel: PropTypes.func.isRequired
};

export default SignUp;
