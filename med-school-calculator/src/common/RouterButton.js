import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';

class RouterButton extends React.Component {
    render() {
        const { link, title, state } = this.props;

        return (
            <Link to={{ pathname: link, state: state }}>
                <Button text={title} />
            </Link>
        );
    }
}

RouterButton.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.object
};

export default RouterButton;
