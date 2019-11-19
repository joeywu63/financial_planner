import React from 'react';
import styled from 'styled-components';

const AltDiv = styled.div`
    margin-left: 30px;
`;

class Alternative extends React.Component {
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
                    <label>{`Alternative option: ${name} : ${description}`}</label>
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

export default Alternative;