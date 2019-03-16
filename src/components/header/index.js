import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderThree from './header.three';
import HeaderOne from './header.one';
import HeaderTwo from './header.two';
import SecondaryHeader from './header.secondary';
import Hidden from '@material-ui/core/Hidden';
import MobileNav from './header.mobile';
import { styles } from './header.styles';
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
      allSitePage,
      user,
    } = this.props;
    const { isUserAuthenticated } = this.state;

    return (
      <React.Fragment>
        <AppBar
          position="relative"
          color="inherit"
          className={classes.headerAppBar}
        >
          <Toolbar className={classes.toolbarMain}>
            <Hidden smDown>
              <HeaderOne siteTitle={siteTitle} classes={classes} />
              <HeaderTwo allSitePages={allSitePage} classes={classes} />
              <HeaderThree
                handleUserAuthenticationAction={
                  this.handleUserAuthenticationAction
                }
                isUserAuthenticated={!!user}
                user={user}
                sections={mocks.headerLeftSectionMocks}
                classes={classes}
              />
            </Hidden>
            <Hidden mdUp>
              <MobileNav
                allSitePages={allSitePage}
                siteTitle={siteTitle}
                isUserAuthenticated={!!user}
                user={user}
                handleUserAuthenticationAction={
                  this.handleUserAuthenticationAction
                }
                sections={mocks.headerLeftSectionMocks}
                classes={classes}
              />
            </Hidden>
          </Toolbar>
          {shouldShowSecondaryHeader && (
            <SecondaryHeader sections={mocks.headerSecondaryMocks} />
          )}
        </AppBar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Header);
