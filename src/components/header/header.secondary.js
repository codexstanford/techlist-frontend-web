import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as GatsbyLink } from 'gatsby';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const AdapterLink = React.forwardRef((props, ref) => (
  <GatsbyLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
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
}));

export function SecondaryHeader(props) {
  const classes = useStyles();
  const { sections } = props;
  return (
    <div className={classes.sectionDesktop}>
      <Toolbar variant="dense" className={classes.toolbarSecondary}>
        {sections &&
          sections.map(section => (
            <Button
              key={section.title}
              color="primary"
              size="small"
              to={section.to}
              aria-label={section.title}
              className={classes.button}
              component={AdapterLink}
            >
              {section.title}
            </Button>
          ))}
      </Toolbar>
    </div>
  );
}

export default SecondaryHeader;
