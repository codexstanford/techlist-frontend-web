import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

function MobileProfileNavigation({
  classes,
  isOpen,
  MainListItems,
  secondaryListItems,
  toggleDrawerVisibility,
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
        <List>{MainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </>
  );
}

export default MobileProfileNavigation;
