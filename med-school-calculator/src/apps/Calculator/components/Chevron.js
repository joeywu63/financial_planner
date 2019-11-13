import React from 'react';
import styled from 'styled-components';

const ChevronItem = styled.li`
    float: left;
`;

// TODO: Change anchor to button
const ChevronAnchor = styled.a`
    color: white;
    cursor: pointer;
    height: 5vh;
    padding: 10px 0 10px 55px;
    background: brown; /* fallback color */
    background: black;
    position: relative;
    display: block;

    :before {
        content: ' ';
        display: block;
        border-top: 50px solid transparent;
        border-bottom: 50px solid transparent;
        border-left: 30px solid white;
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
        border-left: 30px solid black;
        position: absolute;
        top: 50%;
        margin-top: -50px;
        left: 100%;
        z-index: 2;
    }
`;

class Chevron extends React.Component {
    render() {
        const { onClick, title } = this.props;
        return (
            <ChevronItem>
                <ChevronAnchor onClick={() => onClick()}>{title}</ChevronAnchor>
            </ChevronItem>
        );
    }
}

export default Chevron;
