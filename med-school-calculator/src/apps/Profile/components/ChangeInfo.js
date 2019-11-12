import React from 'react';
import PropTypes from 'prop-types';
import { auth } from 'firebase';

import { getCurrentUser } from 'utils/currentUser';
import Button from 'common/Button';
import { PROFILEPAGES } from '../constants';

class ChangeInfo extends React.Component {
    state = {
        displayName: getCurrentUser().displayName,
        email: getCurrentUser().email
    };

    handleChange = event => {
        const key = event.target.getAttribute('name');
        this.setState({
            [key]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = auth().currentUser;

        let updates = [
            user.updateProfile({
                displayName: this.state.displayName
            }),
            user.updateEmail(this.state.email)
        ];

        Promise.all(updates).then(
            () => {
                //TODO: update current user
                window.alert('profile changed successfully');
                this.props.handleSwitchPage(PROFILEPAGES.default);
            }
        ).catch(
            //TODO: error handling, reauthenticate
            (err) => {
                console.log(err);
                window.alert('something went wrong');
            }
        );
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    name
                    <input type='text' name='displayName' value={this.state.displayName} onChange={this.handleChange}></input>
                    email
                    <input type='text' name='email' value={this.state.email} onChange={this.handleChange}></input>
                    <input type='submit' value='submit'></input>
                </form>
                <Button onClick={() => this.props.handleSwitchPage(PROFILEPAGES.default)} text="cancel" />
            </>
        )
        }
}

ChangeInfo.propTypes = {
    handleSwitchPage: PropTypes.func.isRequired
};

export default ChangeInfo;