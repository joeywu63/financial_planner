import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const Spinner = ({ height, width }) => {
    return (
        <Wrapper>
            <Loader
                type="TailSpin"
                height={height}
                width={width}
                color="black"
            />
        </Wrapper>
    );
};

Spinner.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
};

Spinner.defaultProps = {
    height: 40,
    width: 40
};

export default Spinner;
