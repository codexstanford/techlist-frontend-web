import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import MobileNav from './header.mobile';

export function HeaderCenter(props) {
  const { siteTitle, classes } = props;

  return (
    <div className={classes.wrapper}>
      {siteTitle && (
        <Typography
          component={props => <Link to="/" component={GatsbyLink} {...props} />}
          variant="h5"
          color="primary"
          style={{
            fontWeight: '700',
            letterSpacing: '-.5px',
            textDecoration: 'none',
          }}
          noWrap
        >
          {siteTitle}
        </Typography>
      )}
    </div>
  );
}

HeaderCenter.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

export default withStyles(styles)(HeaderCenter);
