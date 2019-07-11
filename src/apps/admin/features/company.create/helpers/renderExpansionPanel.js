import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

export function CodeXExpansionPanel({
  children,
  expandIcon,
  title,
  titleColor,
  titleComponent,
  titleStyle,
  titleVariant,
  error,
  style,
  ...props
}) {
  return (
    <ExpansionPanel
      style={error ? { border: '1px solid red', ...style } : style}
    >
      <ExpansionPanelSummary expandIcon={expandIcon}>
        <Typography
          variant={titleVariant}
          component={titleComponent}
          color={titleColor}
          style={titleStyle}
        >
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

CodeXExpansionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object,
  titleColor: PropTypes.string,
  titleVariant: PropTypes.string,
  expandIcon: PropTypes.element,
};

CodeXExpansionPanel.defaultProps = {
  title: '',
  titleStyle: {
    fontWeight: '800',
    letterSpacing: '-.5px',
    textDecoration: 'none',
  },
  titleColor: 'primary',
  titleComponent: 'h6',
  titleVariant: 'h6',
  expandIcon: <ExpandMoreIcon />,
};

export default CodeXExpansionPanel;
