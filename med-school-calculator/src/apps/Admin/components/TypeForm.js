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
        const { handleCreate } = this.props;
        const { name } = this.state;

        this.setState({ loading: true });
        handleCreate(name);
    };

    render() {
        const { handleCancel } = this.props;
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
                    <input type="submit" value="Create" />
                </form>
                <Button text="Cancel" onClick={handleCancel} />
            </>
        );
    }
}

TypeForm.propTypes = {
    handleCreate: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default TypeForm;
