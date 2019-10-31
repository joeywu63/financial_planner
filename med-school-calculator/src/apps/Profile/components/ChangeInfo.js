import React from 'react';
import PropTypes from 'prop-types';

import Button from 'common/Button';
import { PROFILEPAGES } from '../constants';
import Profile from './Profile';

import { getCurrentUser } from 'utils/currentUser';
import { auth } from 'firebase';

class ChangeInfo extends React.Component {
    constructor(props) {
        super(props);
        // TOFIX: info out of date if user edits twice without refreshing
        const { displayName, email } = getCurrentUser();
        this.state = {displayName: displayName, email: email};
        this.handleChange = this.handleChange.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    handleChange(event) {
        const key = event.target.getAttribute('name');
        const value = event.target.value;

        this.setState({
            [key]: value
        });
    };

    handleName(event) {
        event.preventDefault();

        auth().currentUser.updateProfile({
            displayName: this.state.displayName
          }).then(
              () => {
                window.alert('name changed successfully');
                this.props.handleSwitchPage(PROFILEPAGES.default);
            }
        ).catch(function(error) {
            console.log(error);
            window.alert('something went wrong');
        });          
    }

    handleEmail(event) {
        event.preventDefault();

        auth().currentUser.updateEmail(this.state.email).then(
            () => {
                window.alert('email changed successfully');
                this.props.handleSwitchPage(PROFILEPAGES.default);
            }
        ).catch(function(error) {
            console.log(error);
            window.alert('something went wrong');
        });
          
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleName}>
                    Name:
                    <input type='text' name='displayName' value={this.state.displayName} onChange={this.handleChange}></input>
                    <input type='submit' value='change name'></input>
                </form>
                <form onSubmit={this.handleEmail}>
                    Email:
                    <input type='text' name='email' value={this.state.email} onChange={this.handleChange}></input>
                    <input type='submit' value='change email'></input>
                </form>
            </>
        )
        }
}

ChangeInfo.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangeInfo;