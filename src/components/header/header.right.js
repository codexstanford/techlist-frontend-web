import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

export function HeaderRight(props) {
  const {
    classes,
    isUserAuthenticated,
    handleUserAuthenticationAction,
  } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes.sectionDesktop}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      </div>
      {isUserAuthenticated ? (
        <React.Fragment>
          <IconButton
            aria-haspopup="true"
            onClick={handleUserAuthenticationAction}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleUserAuthenticationAction}
            style={{
              marginLeft: '10px',
            }}
          >
            Login
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}

HeaderRight.propTypes = {
  handleUserAuthenticationaction: PropTypes.func,
  isUserAuthenticated: PropTypes.bool,
};

const styles = theme => ({
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withStyles(styles)(HeaderRight);
