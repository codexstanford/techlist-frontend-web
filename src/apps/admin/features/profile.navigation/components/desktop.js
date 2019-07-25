import React, { useContext } from 'react';
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
import { CreateCompanyModalContext } from '../../../../../store/modal-context';

function DesktopProfileNavigation({
  classes,
  secondaryListItems,
  isOpen,
  toggleDrawerVisibility,
  toggleEditProfile,
  showEditProfile,
  logout,
  user,
  ...props
}) {
  const { showModal } = useContext(CreateCompanyModalContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <>
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
          <ListItem button onClick={showModal}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Create Company" />
          </ListItem>

          <ListItem button onClick={() => toggleEditProfile(!showEditProfile)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </>
  );
}

export default DesktopProfileNavigation;
