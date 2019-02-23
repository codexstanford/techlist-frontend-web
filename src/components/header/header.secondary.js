import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export function SecondaryHeader(props) {
  const { sections, classes } = props;
  return (
    <div className={classes.sectionDesktop}>
      <Toolbar variant="dense" className={classes.toolbarSecondary}>
        {sections &&
          sections.map(section => (
            <Button
              key={section.title}
              color="primary"
              size="small"
              aria-label={section.title}
              className={classes.button}
              component={props => (
                <Link to={section.to} component={GatsbyLink} {...props} />
              )}
            >
              {section.title}
            </Button>
          ))}
      </Toolbar>
    </div>
  );
}

const styles = theme => ({
  toolbarSecondary: {
    justifyContent: 'space-between',
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
});

export default withStyles(styles)(SecondaryHeader);
