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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import BusinessIcon from '@material-ui/icons/Business';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';

import TableRow from '@material-ui/core/TableRow';

import { mainListItems, secondaryListItems } from './__mocks__/listitems';
import { styles } from './__mocks__/styles';
import { graphql } from 'gatsby';

import {
  CompanyLocationMap,
  CompanyIntelligence,
  CompanyNews,
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
    const { company } = allTechList;

    if (company === null) {
      return null;
    }

    return (
      <Layout shouldShowSecondaryHeader={false} fullScreen={true}>
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
                {company.name}
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
              <List>{mainListItems}</List>
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
                <ListItem button>
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

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Grid container spacing={16} className={classes.mainGrid}>
              <Grid item md={8} sm={12}>
                <Card className={classes.card}>
                  {company && company.logo ? (
                    <CardMedia
                      className={classes.media}
                      image={company.logo}
                      title={`${company.name} logo`}
                    />
                  ) : null}
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">
                      {company.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom component="h2">
                      <p>{unescape(company.description)}</p>
                    </Typography>
                  </CardContent>
                </Card>
                <Card className={classes.card}>
                  {company.location && (
                    <>
                      <CardHeader
                        component={() => (
                          <CompanyLocationMap location={company.location} />
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
                              primary={company.location.formatted_address || ''}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </>
                  )}
                </Card>
                <CompanyIntelligence classes={classes} company={company} />
              </Grid>
              <Grid item md={4}>
                <CompanyNews classes={classes} company={company} />
              </Grid>
            </Grid>

            {/* <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Contact Information:
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" color="inherit">
                        Web:
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {company.url}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" color="inherit">
                        Twitter:
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {company.twitter}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" color="inherit">
                        Crunchbase:
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {company.crunchbase}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" color="inherit">
                        AngelList:
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {company.angellist}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card> */}
          </main>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(CompanyTemplate);

export const pageQuery = graphql`
  query Company($id: ID) {
    allTechList {
      company(where: { id: $id }) {
        name
        operatingModels {
          name
          id
        }
        logo
        yearFounded
        description
        visible
        targetMarkets {
          name
          id
        }
        cats {
          name
          id
        }
        location {
          formatted_address
          googleId
          id
          photos
          geometry
        }
        url
        twitter
        crunchbase
        angellist
      }
    }
  }
`;
