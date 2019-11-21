import React from 'react';

class Hoverable extends React.Component {
    state = {
        isHovering: false
    };

    mouseEnter = () => {
        this.setState({ isHovering: true });
    };

    mouseLeave = () => {
        this.setState({ isHovering: false });
    };

    render() {
        const { children } = this.props;

        return children(
            this.state.isHovering,
            this.mouseEnter,
            this.mouseLeave
        );
    }
}

export default Hoverable;
