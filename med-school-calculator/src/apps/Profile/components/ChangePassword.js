import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';

import Button from 'common/Button';
import { PROFILEPAGES } from '../constants';

class ChangePassword extends React.Component {
    state = {
        newPassword: '',
        confirmNewPassword: ''
    };

    handleChange = event => {
        const key = event.target.getAttribute('name');
        const value = event.target.value;

        this.setState({
            [key]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.newPassword == this.state.confirmNewPassword){
            auth().currentUser.updatePassword(this.state.newPassword).then(
                () => {
                    window.alert('password changed successfully');
                    this.props.handleSwitchPage(PROFILEPAGES.default);
                }
            ).catch(
                (err) => {
                    // TODO: error handling, reauthenticate
                    console.log(err);
                    window.alert('something went wrong');
                }
            );
        }else{
            // TODO: display password reqs
            window.alert('passwords do not match');
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    new password
                    <input type='password' name='newPassword' value={this.state.newPassword} onChange={this.handleChange}></input>
                    confirm new password
                    <input type='password' name='confirmNewPassword' value={this.state.confirmNewPassword} onChange={this.handleChange}></input>
                    <input type='submit' value='submit'></input>
                </form>
                <Button onClick={() => this.props.handleSwitchPage(PROFILEPAGES.default)} text="cancel" />
            </>
        );
    }
}

ChangePassword.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangePassword;