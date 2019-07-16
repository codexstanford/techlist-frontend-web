import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';
import CategoryIcon from '@material-ui/icons/Category';
import BuildIcon from '@material-ui/icons/Build';
import Link from '@material-ui/core/Link';
import { navigate } from '@reach/router';

import MainSearch from '../search';
import { useUser } from '../../store/user-context';
import CreateCompanyScreen from '../../apps/admin/routes/company/index';

export function MobileNav({ classes, siteTitle, ...props }) {
  const [isDrawerOpen, toggleDrawer] = React.useState(false);
  const [showCompanyScreen, toggleCompanyScreen] = React.useState(false);
  const { data, logout } = useUser();
  const { user } = data;

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          flexGrow: 1,
        }}
      >
        <Typography
          color="primary"
          variant="h6"
          underline="none"
          noWrap
          style={{
            fontWeight: '700',
            letterSpacing: '-.5px',
            textDecoration: 'none',
          }}
          component={props => <Link to="/" component={GatsbyLink} {...props} />}
        >
          {siteTitle}
        </Typography>
        <Button onClick={toggleDrawer} color="primary" aria-label="Toggle Menu">
          <MenuIcon />
        </Button>
      </div>
      <CreateCompanyScreen
        open={showCompanyScreen}
        onCancel={toggleCompanyScreen}
        classes={classes}
        user={user}
      />

      <SwipeableDrawer
        anchor="top"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(!isDrawerOpen)}
        onOpen={() => toggleDrawer(!isDrawerOpen)}
      >
        <div
          tabIndex={0}
          role="button"
          // onClick={this.toggleDrawer}
          // onKeyDown={this.toggleDrawer}
        >
          <SideLeft
            classes={classes}
            {...props}
            showCompanyScreen={showCompanyScreen}
            toggleCompanyScreen={toggleCompanyScreen}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
}

const SideLeft = props => {
  const { data, logout } = useUser();
  const { user } = data;
  const {
    classes,
    allSitePages,
    showCompanyScreen,
    toggleCompanyScreen,
    isDrawerOpen,
    toggleDrawer,
  } = props;
  const isUserLoggedIn = user ? true : false;

  return (
    <div style={{ minHeight: '50vh' }}>
      <List>
        <ListItem>
          <MainSearch
            placeholder="Search…"
            suggestions={allSitePages ? allSitePages.edges : []}
            classes={classes}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => toggleDrawer(!isDrawerOpen)}
          component={GatsbyLink}
          to="/"
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          onClick={() => toggleDrawer(!isDrawerOpen)}
          button
          component={GatsbyLink}
          to="/about/"
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem
          button
          onClick={() => toggleDrawer(!isDrawerOpen)}
          button
          component={GatsbyLink}
          to="/companies/"
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Index" />
        </ListItem>
        <ListItem
          button
          onClick={() => toggleDrawer(!isDrawerOpen)}
          component={GatsbyLink}
          to="/tags/"
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        {isUserLoggedIn ? (
          <ListItem
            button
            onClick={() => {
              toggleDrawer(!isDrawerOpen);
              isUserLoggedIn
                ? toggleCompanyScreen(!showCompanyScreen)
                : navigate('/app/login/');
            }}
          >
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Get Listed" />
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={() => toggleDrawer(!isDrawerOpen)}
            component={GatsbyLink}
            to={'/app/login/'}
          >
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Get Listed" />
          </ListItem>
        )}

        {isUserLoggedIn ? (
          <>
            <ListItem
              button
              onClick={() => toggleDrawer(!isDrawerOpen)}
              component={GatsbyLink}
              to="/app/profile/"
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={GatsbyLink} to="/app/login/">
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                onClick={() => {
                  logout();
                  toggleDrawer(!isDrawerOpen);
                }}
              />
            </ListItem>
          </>
        ) : (
          <ListItem
            button
            onClick={() => toggleDrawer(!isDrawerOpen)}
            button
            component={GatsbyLink}
            to="/app/login/"
          >
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default MobileNav;
