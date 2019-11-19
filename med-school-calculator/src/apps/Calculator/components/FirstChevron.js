import React from 'react';
import styled from 'styled-components';

const ChevronAnchor = styled.a`
    color: black;
    background: white;
    padding: 10px 0 10px 0px;
    position: relative;
    display: flex;
    align-items: center;

    :before {
        content: ' ';
        display: block;
        border-top: 50px solid transparent;
        border-bottom: 50px solid transparent;
        border-left: 30px solid black;
        position: absolute;
        top: 50%;
        margin-top: -50px;
        margin-left: 1px;
        left: 100%;
        z-index: 1;
    }

    :after {
        content: ' ';
        display: block;
        border-top: 50px solid transparent;
        border-bottom: 50px solid transparent;
        border-left: 30px solid white;
        position: absolute;
        top: 50%;
        margin-top: -50px;
        left: 100%;
        z-index: 2;
    }
`;

class FirstChevron extends React.Component {
    render() {
        return <ChevronAnchor />;
    }
}

export default FirstChevron;
