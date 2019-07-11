import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { navigate } from '@reach/router';

function DesktopProfileNavigation({
  classes,
  MainListItems,
  secondaryListItems,
  isOpen,
  isClosed,
  toggleDrawerVisibility,
  logout,
}) {
  return (
    <>
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
          <IconButton onClick={() => toggleDrawerVisibility(!isOpen)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText
              primary="Create Company"
              onClick={() => navigate('/app/company/')}
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
    </>
  );
}

export default DesktopProfileNavigation;
