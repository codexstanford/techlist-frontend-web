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

export function Header({
  siteTitle,
  classes,
  shouldShowSecondaryHeader = true,
  allSitePage,
}) {
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
              sections={mocks.headerLeftSectionMocks}
              classes={classes}
            />
          </Hidden>
          <Hidden mdUp>
            <MobileNav
              allSitePages={allSitePage}
              siteTitle={siteTitle}
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

export default withStyles(styles)(Header);
