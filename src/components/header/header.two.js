import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './header.styles';
import { withStyles } from '@material-ui/core/styles';
import MainSearch from '../search';

export function HeaderRight(props) {
  const { classes, allSitePages } = props;

  return (
    <div className={classes.wrapper}>
      <MainSearch
        placeholder="Search…"
        suggestions={allSitePages ? allSitePages.edges : []}
        classes={classes}
      />
    </div>
  );
}

HeaderRight.propTypes = {
  classes: PropTypes.array,
  allSitePages: PropTypes.any,
};

export default withStyles(styles)(HeaderRight);
