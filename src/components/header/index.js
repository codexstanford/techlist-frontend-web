import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderLeft from './header.left';
import HeaderCenter from './header.center';
import HeaderRight from './header.right';
import SecondaryHeader from './header.secondary';
import { withStyles } from '@material-ui/core/styles';

import mocks from './__mocks__';

export class Header extends React.Component {
  state = {
    isMenuOpen: false,
    isUserAuthenticated: false,
  };

  toggleMenu = () => {
    this.setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  };

  handleUserAuthenticationAction = async () => {
    setTimeout(
      this.setState(prev => ({
        ...prev,
        isUserAuthenticated: !prev.isUserAuthenticated,
      })),
      300
    );
  };

  render() {
    const {
      siteTitle,
      classes,
      shouldShowSecondaryHeader = true,
      fullScreen,
    } = this.props;
    const { isUserAuthenticated } = this.state;
    return (
      <React.Fragment>
        <AppBar
          position="relative"
          color="white"
          style={{
            display: 'flex',
            alignItems: fullScreen ? 'space-between' : 'center',
            flexDirection: 'column',
          }}
        >
          <Toolbar className={classes.toolbarMain}>
            <HeaderCenter siteTitle={siteTitle} />
            <HeaderRight
              handleUserAuthenticationAction={
                this.handleUserAuthenticationAction
              }
              isUserAuthenticated={isUserAuthenticated}
            />
            <HeaderLeft
              handleUserAuthenticationAction={
                this.handleUserAuthenticationAction
              }
              isUserAuthenticated={isUserAuthenticated}
              sections={mocks.headerLeftSectionMocks}
            />
          </Toolbar>
          {shouldShowSecondaryHeader && (
            <SecondaryHeader sections={mocks.headerSecondaryMocks} />
          )}
        </AppBar>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  layout: {
    display: 'flex',
    justifyContent: 'space-between',
    // color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default withStyles(styles)(Header);
