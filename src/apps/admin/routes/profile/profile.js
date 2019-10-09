import React, { useState } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';

import ProfileNav from '../../features/profile.navigation/';
import ProfileAffiliations from '../../features/profile.affiliations';
import ProfileCompanies from '../../features/profile.companies';
import EditProfile from '../../components/profile.edit';

export function UserProfile({ classes, ...props }) {
  const [isOpen, toggleDrawerVisibility] = useState();
  const [showEditProfile, toggleEditProfile] = useState(false);

  const { data, logout } = props;
  const { person, id: partyAccountId, admin } = data;
  const { affiliation } = person;
  const bag = {
    showEditProfile,
    toggleEditProfile,
  };

  React.useEffect(() => {
    const w = window,
      d = document,
      e = d.documentElement,
      wx = w.innerWidth || e.clientWidth || g.clientWidth;
    if (wx && wx < 480) {
      toggleDrawerVisibility(false);
    } else {
      toggleDrawerVisibility(true);
    }
  }, []);

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
        user={props.user}
        {...props}
        {...bag}
      />
      <StyledMain>
        <div className={classes.appBarSpacer} />
        <ProfileCompanies user={data} />
        <Spacer />

        <ProfileAffiliations person={person} />
      </StyledMain>
      <EditProfile
        open={showEditProfile}
        classes={classes}
        handleClose={() => toggleEditProfile(!showEditProfile)}
      />
    </div>
  );
}

export default UserProfile;

const Spacer = styled.div`
  min-width: 1rem;
  @media (max-width: 960px) {
    display: none;
  }
`;

const StyledWrapper = styled.main`
  display: flex;
  justify-content: space-around;
  @media (min-width: 1080px) {
    max-width: 100%;
  }
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const StyledCard = styled(Card)`
  min-width: 35%;
  margin-bottom: 10px;
  height: 100%;
  @media (max-width: 480px) {
    flex-direction: column;
    min-width: 250px;
    max-width: 100%;
  }
`;

const StyledMain = styled.main`
  flex-grow: 1;
  padding: 8px;
  overflow: auto;
  @media (min-width: 480px) {
    padding: 24px;
  }
`;
