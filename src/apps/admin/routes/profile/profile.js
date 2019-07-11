import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ProfileNav from '../../features/profile.navigation/';
import { useUser } from '../../../../store/user-context';

import styled from 'styled-components';

import ProfileAffiliations from '../../features/profile.affiliations';

export function UserProfile({ classes, ...props }) {
  const [isOpen, toggleDrawerVisibility] = React.useState(true);
  const { logout } = useUser();
  const { data } = props;
  const { person, id: partyAccountId } = data;

  // console.log('USER IN USERPROFILE DISPLAY,', data);
  // console.log('PERSONM IN USERPROFILE DISPLAY,', person);
  console.log('Classes.content', classes.content);

  const { name } = person;
  const displayName = name[0];

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
            onClick={() => toggleDrawerVisibility(!isOpen)}
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
            {displayName ? displayName.firstName : ''}{' '}
            {displayName ? displayName.lastName : ''}{' '}
          </Typography>
        </Toolbar>
      </AppBar>
      <ProfileNav
        classes={classes}
        isOpen={isOpen}
        toggleDrawerVisibility={toggleDrawerVisibility}
        logout={logout}
      />

      <StyledMain>
        <div className={classes.appBarSpacer} />
        <StyledWrapper>
          <Card>
            <CardContent>
              <ProfileAffiliations affiliations={person.affiliation} />
            </CardContent>
          </Card>
        </StyledWrapper>
      </StyledMain>
    </div>
  );
}

export default UserProfile;

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
