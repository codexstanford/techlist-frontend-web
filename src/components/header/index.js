import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderThree from './header.three';
import HeaderOne from './header.one';
import HeaderTwo from './header.two';
import SecondaryHeader from './header.secondary';
import { StaticQuery, graphql } from 'gatsby';

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
      data,
    } = this.props;
    const { isUserAuthenticated } = this.state;
    const { allSitePage } = data;
    console.log(this.props);
    return (
      <React.Fragment>
        <AppBar
          position="relative"
          color="inherit"
          style={{
            display: 'flex',
            alignItems: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Toolbar className={classes.toolbarMain}>
            <HeaderOne siteTitle={siteTitle} />
            <HeaderTwo allSitePages={allSitePage} />
            <HeaderThree
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

const EnhancedHeader = withStyles(styles)(Header);

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allSitePage {
          edges {
            node {
              context {
                slug
                id
                name
              }
            }
          }
        }
      }
    `}
    render={data => <EnhancedHeader data={data} {...props} />}
  />
);
