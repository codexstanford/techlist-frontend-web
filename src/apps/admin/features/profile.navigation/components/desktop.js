import React, { useState } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';

import CreateCompanyScreen from '../../../routes/company';
import EditProfile from '../../../components/profile.edit';

function DesktopProfileNavigation({
  classes,
  MainListItems,
  secondaryListItems,
  isOpen,
  toggleDrawerVisibility,
  logout,
  user,
}) {
  const [showCompanyScreen, toggleCompanyScreen] = useState(false);
  const [showEditProfile, toggleEditProfile] = useState(false);

  return (
    <>
      <CreateCompanyScreen
        open={showCompanyScreen}
        onCancel={toggleCompanyScreen}
        classes={classes}
        user={user}
      />
      <EditProfile
        open={showEditProfile}
        classes={classes}
        handleClose={() => toggleEditProfile(!showEditProfile)}
      />
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
              onClick={() => toggleCompanyScreen(!showCompanyScreen)}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText
              primary="Edit Profile"
              onClick={() => toggleEditProfile(!showEditProfile)}
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
