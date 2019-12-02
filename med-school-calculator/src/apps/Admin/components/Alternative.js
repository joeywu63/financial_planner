import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';

import AlternativeForm from './AlternativeForm';

import IconButton from 'common/IconButton';
import DeleteModal from 'common/DeleteModal';
import InfoTooltip from 'common/InfoTooltip';
import info_icon from 'img/question-mark-icon.png';

const StyledIconButton = styled(IconButton)`
    visibility: ${props => (props.isHovering ? 'visible' : 'hidden')};
`;

class Alternative extends React.Component {
    state = {
        alternatives: [],
        loading: true,
        expenses: null,
        isAddingAlternative: false,
        isEditingAlternative: false,
        isHovering: false,
        isModalOpen: false
    };

    handleOnMouseEnter = () => {
        this.setState({ isHovering: true });
    };

    handleOnMouseLeave = () => {
        this.setState({ isHovering: false });
    };

    handleUpdateAlternative = (name, description, url, cost) => {
        const { handleUpdateAlternative } = this.props;
        const { id } = this.props.alternative;

        handleUpdateAlternative(id, name, description, url, cost);
        this.setState({ isEditingAlternative: false });
    };

    toggleEditAlternative = () => {
        const { isEditingAlternative } = this.state;
        this.setState({ isEditingAlternative: !isEditingAlternative });
    };

    toggleModal = () => {
        const { isModalOpen } = this.state;

        this.setState({ isModalOpen: !isModalOpen });
    };

    render() {
        const { id, name, cost, description, url } = this.props.alternative;
        const { handleDeleteAlternative } = this.props;
        const { isEditingAlternative, isHovering, isModalOpen } = this.state;

        return isEditingAlternative ? (
            <AlternativeForm
                handleCancel={this.toggleEditAlternative}
                handleSubmit={this.handleUpdateAlternative}
                id={id}
                name={name}
                description={description}
                url={url}
                cost={cost}
            />
        ) : (
            <>
                <DeleteModal
                    isOpen={isModalOpen}
                    onRequestClose={this.toggleModal}
                    onDelete={() => handleDeleteAlternative(id)}
                    deleteConfirmationName="DELETE"
                />
                <Cell
                    width={2}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                    middle={true}
                >
                    {name}
                </Cell>
                <Cell
                    width={3}
                    middle={true}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    {description}
                </Cell>
                <Cell
                    width={2}
                    middle={true}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    {url.length > 0 ? (
                        <div>
                            URL:
                            <InfoTooltip
                                hoverMessage={url}
                                trigger={
                                    <img
                                        src={`${info_icon}`}
                                        width="15"
                                        height="15"
                                        alt="url"
                                    />
                                }
                            />
                        </div>
                    ) : (
                        'No URL'
                    )}
                </Cell>
                <Cell
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                    middle={true}
                >{`$${cost}`}</Cell>
                <Cell
                    width={2}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    <StyledIconButton
                        name="pen"
                        onClick={this.toggleEditAlternative}
                        isHovering={isHovering}
                    />
                    <StyledIconButton
                        name="trash-alt"
                        onClick={this.toggleModal}
                        isHovering={isHovering}
                    />
                </Cell>
            </>
        );
    }
}

Alternative.propTypes = {
    alternative: PropTypes.object.isRequired
};

export default Alternative;
