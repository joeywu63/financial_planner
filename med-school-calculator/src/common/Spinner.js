import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Spinner = ({ className, height, width }) => {
    return (
        <Loader
            className={className}
            type="TailSpin"
            height={height}
            width={width}
            color="black"
        />
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
