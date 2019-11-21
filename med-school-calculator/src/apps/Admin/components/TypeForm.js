import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from 'common/IconButton';
import Input from 'common/Input';

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const StyledInput = styled(Input)`
    width: 200px;
`;

class TypeForm extends React.Component {
    state = {
        name: this.props.name,
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
        const { handleCancel } = this.props;
        const { name } = this.state;

        return (
            <FormWrapper>
                <StyledInput
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={this.handleChange}
                />
                <IconButton name="check" onClick={this.handleSubmit} />
                <IconButton name="times" onClick={handleCancel} />
            </FormWrapper>
        );
    }
}

TypeForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    name: PropTypes.string
};

TypeForm.defaultProps = {
    isUpdateForm: false,
    name: ''
};

export default TypeForm;
