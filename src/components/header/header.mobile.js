import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import MainSearch from '../search';

class MobileNav extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  toggleDrawer = () => {
    this.setState(prev => ({ ...prev, isDrawerOpen: !prev.isDrawerOpen }));
  };

  render() {
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
            component={props => (
              <Link to="/" component={GatsbyLink} {...props} />
            )}
          >
            {this.props.siteTitle}
          </Typography>
          <Button onClick={this.toggleDrawer} color="primary">
            <MenuIcon />
          </Button>
        </div>

        <SwipeableDrawer
          anchor="top"
          open={this.state.isDrawerOpen}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={this.toggleDrawer}
            // onKeyDown={this.toggleDrawer}
          >
            <SideLeft {...this.props} />
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    );
  }
}

const SideLeft = props => {
  const { classes, allSitePages } = props;
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
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Get Listed" />
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(theme => ({
  list: {
    width: 'auto',
  },
  fullList: {
    width: 'auto',
  },
}))(MobileNav);
