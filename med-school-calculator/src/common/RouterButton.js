import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RouterButton extends React.Component {
    render() {
        const { link, title } = this.props;

        return (
            <Link to={link}>
                <button>{title}</button>
            </Link>
        );
    }
}

RouterButton.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default RouterButton;
