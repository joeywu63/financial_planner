import React from 'react';
import PropTypes from 'prop-types';

import Button from 'common/Button';
import { PROFILEPAGES } from '../constants';
import Profile from './Profile';

import { auth } from 'firebase';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {newPassword: '', confirmNewPassword: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const key = event.target.getAttribute('name');
        const value = event.target.value;

        this.setState({
            [key]: value
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        if(this.state.newPassword == this.state.confirmNewPassword){
            auth().currentUser.updatePassword(this.state.newPassword).then(
                () => {
                    window.alert('password changed successfully');
                    this.props.handleSwitchPage(PROFILEPAGES.default);
                }
            ).catch(
                (err) => {
                    // TODO: error handling
                    console.log(err);
                    window.alert('something went wrong');
                }
            )
        }else{
            // TODO: display password reqs
            window.alert('passwords do not match');
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>new password</p>
                <input type='password' name='newPassword' value={this.state.newPassword} onChange={this.handleChange}></input>
                <p>confirm new password</p>
                <input type='password' name='confirmNewPassword' value={this.state.confirmNewPassword} onChange={this.handleChange}></input>
                <br></br>
                <input type='submit' value='submit'></input>
            </form>
        );
    }
}

ChangePassword.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangePassword;