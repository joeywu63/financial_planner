import React from 'react';
import {COLOURS} from '../utils/constants';
import {Tooltip} from 'react-lightweight-tooltip';

const infoStyle = {
    tooltip: {
      backgroundColor: 'white',
      border: `dashed ${COLOURS.lightorange} 2px`,
      borderRadius: '10px',
      bottom: '60%',
    },
    content: {
      backgroundColor: 'transparent',
      fontSize: '.9em',
      color: 'black',
      align: 'center',
      justify: 'center',
    },
    arrow: {
      borderTop: `solid ${COLOURS.lightorange} 5px`,
    },
};

class InfoTooltip extends React.Component {
  render() {
      const { hoverMessage, trigger } = this.props;
      return (<Tooltip content={hoverMessage} styles={infoStyle}>
                {trigger}
              </Tooltip>)
  }
}
  
export default InfoTooltip;
