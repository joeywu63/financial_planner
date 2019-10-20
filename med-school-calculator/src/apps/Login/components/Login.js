import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';

import Button from 'common/Button';

class Login extends React.Component {
    state = {
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
        const { email, password } = this.state;

        auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => alert('unable to sign in, please try again later'));
    };

    render() {
        const { handleSignUp } = this.props;
        const { email, password } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                    <input type="submit" value="Login" />
                </form>
                <Button onClick={handleSignUp} text="Sign up" />
            </div>
        );
    }
}

Login.propTypes = {
    handleSignUp: PropTypes.func.isRequired
};

export default Login;
