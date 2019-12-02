import React from 'react';
import styled from 'styled-components';
import { COLOURS } from 'utils/constants';

const Wrapper = styled.div`
    padding: 40px 20px;
    background-color: ${COLOURS.white};
    min-height: 100vh
`;

class PageWrapper extends React.Component {
    render() {
        return <Wrapper>{this.props.children}</Wrapper>;
    }
}

export default PageWrapper;
