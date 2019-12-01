import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';
import styled from 'styled-components';

import IconButton from 'common/IconButton';
import Input from 'common/Input';

const CostInput = styled(Input)`
    width: 90%;
`;

class AlternativeForm extends React.Component {
    state = {
        name: this.props.name,
        description: this.props.description,
        cost: this.props.cost,
        url: this.props.url,
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
        const { name, description, cost, url } = this.state;

        this.setState({ loading: true });
        handleSubmit(name, description, url, parseInt(cost));
    };

    render() {
        const { handleCancel } = this.props;
        const { name, description, cost, url } = this.state;

        return (
            <>
                <Cell width={2} middle={true}>
                    <Input
                        name="name"
                        value={name}
                        placeholder="name of alternative"
                        onChange={this.handleChange}
                    />
                </Cell>
                <Cell width={3} middle={true}>
                    <Input
                        name="description"
                        value={description}
                        placeholder="description"
                        onChange={this.handleChange}
                    />
                </Cell>
                <Cell width={2} middle={true}>
                    <Input
                        name="url"
                        value={url}
                        placeholder="url"
                        onChange={this.handleChange}
                    />
                </Cell>
                <Cell middle={true}>
                    <CostInput
                        name="cost"
                        type="number"
                        value={`${cost}`}
                        onChange={this.handleChange}
                    />
                </Cell>
                <Cell width={2}>
                    <IconButton name="check" onClick={this.handleSubmit} />
                    <IconButton name="times" onClick={handleCancel} />
                </Cell>
            </>
        );
    }
}

AlternativeForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    cost: PropTypes.number
};

AlternativeForm.defaultProps = {
    name: '',
    description: '',
    url: '',
    cost: 0
};

export default AlternativeForm;
