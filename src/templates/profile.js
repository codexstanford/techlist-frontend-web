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
          </StyledToolbar>
        </AppBar>
        <StyledMain>
          <div className={classes.appBarSpacer} />
          <StyledWrapper>
            <StyledCard>
              <CardContent>
                <ProfileCompanies user={user} />
              </CardContent>
            </StyledCard>
            <StyledCard>
              <CardContent>
                <ProfileAffiliations person={person} />
              </CardContent>
            </StyledCard>
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

const StyledCard = styled(Card)`
  min-width: 350px;
  margin-bottom: 10px;
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
const StyledToolbar = styled(Toolbar)`
  text-align: center;
`;
