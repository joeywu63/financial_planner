import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOURS } from 'utils/constants';

const ChevronAnchor = styled.button`
    outpadding-top: 0px;
    padding-bottom: 0px;
    border-width: 0px;
    color: ${props => (props.isSelected ? `${COLOURS.white}` : `${COLOURS.darkblue}`)};
    background: ${props => (props.isSelected ? `${COLOURS.darkblue}` : `${COLOURS.white}`)};
    cursor: pointer;
    padding: 10px 0 10px 45px;
    position: relative;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 16px;

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
        border-left: 30px solid
            ${props => (props.isSelected ? `${COLOURS.darkblue}` : `${COLOURS.white}`)};
        position: absolute;
        top: 50%;
        margin-top: -50px;
        left: 100%;
        z-index: 2;
    }

    :focus {
        color: white;
        background: ${COLOURS.darkblue};
        :after {
            border-left: 30px solid black;
        }
        outline: 0;
    }

    :hover {
        color: white;
        background: ${COLOURS.darkblue};
        :after {
            border-left: 30px solid black;
        }
    }
`;

class Chevron extends React.Component {
    render() {
        const { onClick, title, isSelected } = this.props;
        return (
            <ChevronAnchor onClick={onClick} isSelected={isSelected}>
                {title}
            </ChevronAnchor>
        );
    }
}

Chevron.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired
};

export default Chevron;
