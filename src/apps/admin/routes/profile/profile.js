import React from 'react';
import classNames from 'classnames';
import { Query } from 'react-apollo';

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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { GET_PERSON_QUERY } from '../../../../graphql';
import { MainListItems, secondaryListItems } from './listitems';
import { useUser } from '../../../../store/user-context';

export function UserProfile({ classes, ...props }) {
  const [isOpen, toggleDrawerVisibility] = React.useState(false);

  const { data, logout } = useUser();

  const { user } = data;

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, isOpen && classes.appBarShift)}
      >
        <Toolbar disableGutters={!isOpen} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawerVisibility}
            className={classNames(
              classes.menuButton,
              isOpen && classes.menuButtonHidden
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
            {user.person.profile ? user.person.profile.firstName : ''}{' '}
            {user.person.profile ? user.person.profile.lastName : ''}{' '}
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
              !isOpen && classes.drawerPaperClose
            ),
          }}
          open={isOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={toggleDrawerVisibility}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{MainListItems}</List>
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
              !isOpen && classes.drawerPaperClose
            ),
          }}
          open={isOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={toggleDrawerVisibility}>
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
                onClick={toggleDrawerVisibility}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" onClick={() => logout()} />
            </ListItem>
          </List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
      </Hidden>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Coming soon!
            </Typography>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default UserProfile;
