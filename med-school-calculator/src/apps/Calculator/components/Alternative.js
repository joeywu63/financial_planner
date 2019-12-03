import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import PropTypes from 'prop-types';
import InfoTooltip from 'common/InfoTooltip';
import info_icon from 'img/question-mark-icon.png';
import { COLOURS } from 'utils/constants';

const AltDiv = styled.div`
    margin-left: 30px;
    margin-bottom: 3px;
    color: ${COLOURS.white};
`;

const StyledLink = styled.a`
    color: white;
`;

class Alternative extends React.Component {
    componentDidMount() {
        if (this.props.checked) {
            this.handleChange();
        }
    }

    state = { checked: false };

    handleChange = () => {
        const { checked } = this.state;
        this.setState({ checked: !checked });
        this.props.onChange(this.props, !checked);
    };

    render() {
        const { checked } = this.state;
        const { name, description, url, cost } = this.props;
        return (
            <AltDiv>
                <Grid columns={'20px 45px auto'}>
                    <Cell>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={this.handleChange}
                        />
                    </Cell>
                    <Cell>{`$${cost}`}</Cell>
                    <Cell>
                        <StyledLink
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {name}
                        </StyledLink>
                        {description ? (
                            <InfoTooltip
                                hoverMessage={description}
                                trigger={
                                    <img
                                        src={`${info_icon}`}
                                        width="15"
                                        height="15"
                                        alt="description"
                                    />
                                }
                            />
                        ) : (
                            ''
                        )}
                    </Cell>
                </Grid>
            </AltDiv>
        );
    }
}

Alternative.propTypes = {
    cost: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Alternative;
