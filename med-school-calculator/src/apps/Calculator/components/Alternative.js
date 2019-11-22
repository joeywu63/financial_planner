import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AltDiv = styled.div`
    margin-left: 30px;
`;

class Alternative extends React.Component {
    async componentDidMount() {
        if(this.props.checked){
            this.handleChange();
        }
    }

    state = { checked: false };

    handleChange = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked });
        this.props.onChange(this.props, !checked);
    };

    render() {
        const { checked } = this.state;
        const { name, description, cost } = this.props;
        return (
            <AltDiv>
                <form>
                    <label>{`${name} : ${description}`}</label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={this.handleChange}
                    ></input>
                    <small>{`${cost} $`}</small>
                </form>
            </AltDiv>
        );
    }
}

Alternative.propTypes = {
    cost: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Alternative;