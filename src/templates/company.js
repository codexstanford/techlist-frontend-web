import React from 'react';
import Layout from '../components/layout';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { formatCompanyCategories } from './company/helpers';

import { mainListItems, secondaryListItems } from './__mocks__/listitems';
import { styles } from './__mocks__/styles';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import {
  CompanyLocationMap,
  CompanyIntelligence,
  CompanyNews,
  CompanyContact,
} from './company/index';
import CardHeader from '@material-ui/core/CardHeader';

class CompanyTemplate extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      data: { allTechList },
    } = this.props;
    const { organization } = allTechList;

    if (organization === null) {
      return null;
    }

    return (
      <Layout
        shouldShowSecondaryHeader={false}
        fullScreen={true}
        shouldShowSearch={false}
      >
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {organization.name[0].payload}
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Hidden smUp>
            <Drawer
              variant="temporary"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose
                ),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem button onClick={this.handleDrawerClose}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
          </Hidden>
          <Hidden xsDown>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose
                ),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem button onClick={this.handleDrawerClose}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    onClick={this.handleDrawerClose}
                  />
                </ListItem>
              </List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
          </Hidden>

          <StyledMain>
            <div className={classes.appBarSpacer} />
            <Grid container spacing={16} className={classes.mainGrid}>
              <Grid item md={8} xs={12}>
                <Card className={classes.card}>
                  {organization &&
                  organization.logo &&
                  organization.logo.length > 0 &&
                  organization.logo[0].payload !==
                    'http://via.placeholder.com/640x360' ? (
                    <CardMedia
                      className={classes.media}
                      image={organization.logo[0].payload}
                      title={`${organization.name} logo`}
                    />
                  ) : (
                    <CardHeader
                      className={classes.media}
                      component={() => (
                        <DefaultLogoContainer>
                          <div>
                            <DefaultLogoTitle>
                              {organization.name[0].payload}
                            </DefaultLogoTitle>
                          </div>
                        </DefaultLogoContainer>
                      )}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">
                      {organization.name[0].payload}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="h2">
                      <p>{unescape(organization.description)}</p>
                    </Typography>
                    {organization.categories &&
                      organization.categories.length > 0 && (
                        <Typography variant="overline" color="textSecondary">
                          {formatCompanyCategories(organization.categories)}
                        </Typography>
                      )}
                  </CardContent>
                </Card>

                <Card className={classes.card}>
                  {organization.location[0] &&
                    organization.location[0].formatted_address !== null && (
                      <>
                        <CardHeader
                          component={() => (
                            <CompanyLocationMap
                              location={organization.location[0]}
                            />
                          )}
                        />
                        <CardContent>
                          <Typography component="h3" variant="h6">
                            Location
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <BusinessIcon />
                              </ListItemIcon>

                              <ListItemText
                                primary={
                                  organization.location[0].formatted_address ||
                                  ''
                                }
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </>
                    )}
                </Card>
                <CompanyIntelligence classes={classes} company={organization} />
                <CompanyContact
                  links={organization.links}
                  name={organization.name[0].payload}
                />
              </Grid>
              <Grid item md={4}>
                <CompanyNews classes={classes} company={organization} />
              </Grid>
            </Grid>
          </StyledMain>
        </div>
      </Layout>
    );
  }
}

const DefaultLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b1040e;
  padding: 4px;

  @media (min-width: 480) {
    min-height: 300px;
  }
`;

const StyledWrapper = styled.main`
  @media (min-width: 1080px) {
    max-width: 600px;
  }
`;

const StyledMain = styled.main`
  flex-grow: 1;
  padding: 8px;
  height: 100vh;
  overflow: auto;

  @media (min-width: 480px) {
    padding: 24px;
  }
`;

export default withStyles(styles)(CompanyTemplate);

export const pageQuery = graphql`
  query Company($id: ID) {
    allTechList {
      organization(where: { id: $id }) {
        id
        name {
          payload
        }
        logo {
          id
          payload
        }
        location {
          formatted_address
          googleId
          photos
          geometry
        }
        categories {
          id
          payload
        }
        yearFounded
        description

        targetMarkets {
          id
          payload
        }
        links {
          id
          payload
          type
        }
      }
    }
  }
`;

const DefaultLogoTitle = styled.h1`
  color: white;
  font-size: 52px;
  font-family: ${[
    'Source Sans Pro',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(',')};

  @media (min-width: 480) {
    min-height: 300px;
    font-size: 72px;
  }
`;
