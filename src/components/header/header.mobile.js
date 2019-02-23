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
import { Link as GatsbyLink, graphql } from 'gatsby';
import Link from '@material-ui/core/Link';

class MobileNav extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  toggleDrawer = () => {
    this.setState(prev => ({ ...prev, isDrawerOpen: !prev.isDrawerOpen }));
  };

  render() {
    return (
      <div>
        {/* <Button onClick={this.toggleDrawer}>Open Left</Button> */}
        <SwipeableDrawer
          open={this.state.isDrawerOpen}
          onClose={this.toggleDrawer}
          onOpen={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <SideLeft {...this.props} />
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

const SideLeft = props => {
  const { classes } = props;
  return (
    <div className={classes.list}>
      <List>
        {['Index'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItem
              button
              component={props => (
                <Link to="/companies" component={GatsbyLink} {...props} />
              )}
              primary={text}
            >
              {text}
            </ListItem>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['News', 'Trending', 'Other'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default withStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}))(MobileNav);
