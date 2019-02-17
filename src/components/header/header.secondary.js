import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
            <Typography
              component={Button}
              color="inherit"
              variant="caption"
              noWrap
              key={section.title}
            >
              {section.title}
            </Typography>
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
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
});

export default withStyles(styles)(SecondaryHeader);
