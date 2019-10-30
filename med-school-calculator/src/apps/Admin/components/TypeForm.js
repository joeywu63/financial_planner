import React from 'react';
import PropTypes from 'prop-types';

import Button from 'common/Button';

class TypeForm extends React.Component {
    state = {
        name: '',
        loading: false
    };

    handleChange = e => {
        const key = e.target.getAttribute('name');
        this.setState({
            [key]: e.target.value
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { handleSubmit } = this.props;
        const { name } = this.state;

        this.setState({ loading: true });
        handleSubmit(name);
    };

    render() {
        const { handleCancel, isUpdateForm } = this.props;
        const { name } = this.state;

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value={isUpdateForm ? 'Update' : 'Create'} />
                </form>
                <Button text="Cancel" onClick={handleCancel} />
            </>
        );
    }
}

TypeForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    isUpdateForm: PropTypes.bool
};

TypeForm.defaultProps = {
    isUpdateForm: false
};

export default TypeForm;
