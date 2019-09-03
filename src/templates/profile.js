import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import ProfileAffiliations from '../apps/admin/features/profile.affiliations';
import ProfileCompanies from '../apps/admin/features/profile.companies';
import { styles } from './__mocks__/styles';
import Layout from '../components/layout';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

export function ProfileTemplate({ classes, pageContext, ...props }) {
  const { user } = pageContext;
  const { person } = user;

  const { name } = person;
  const displayName = name[0];

  return (
    <Layout
      shouldShowSecondaryHeader={false}
      fullScreen={true}
      shouldShowSearch={false}
    >
      <div className={classes.root}>
        <AppBar position="absolute" className={classNames(classes.appBar)}>
          <StyledToolbar disableGutters={true} className={classes.toolbar}>
            <StyledAvatar>
              <img
                src={person.avatar[0].payload}
                style={{ height: '100%', width: '100%' }}
              />
            </StyledAvatar>
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
            <Link
              className={classes.link}
              href={`mailto:${person.email[0].payload}`}
              target="_blank"
            >
              {person.email[0].payload}
            </Link>
          </StyledToolbar>
        </AppBar>
        <StyledMain>
          <div className={classes.appBarSpacer} />
          <StyledWrapper>
            <ProfileCompanies user={user} />

            <ProfileAffiliations person={person} />
          </StyledWrapper>
        </StyledMain>
      </div>
    </Layout>
  );
}

export default withStyles(styles)(ProfileTemplate);

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

const StyledAvatar = styled(Avatar)`
  height: 50px;
  width: 50px;
  margin-left: 24px;
`;

const StyledMain = styled.main`
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
`;

const StyledToolbar = styled(Toolbar)`
  text-align: center;
`;
