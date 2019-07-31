import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

import AffiliationControls from '../components/controls';
import { AffiliationAvatar, AffiliationContent } from '../components';

const useStyles = makeStyles({
  divider: {
    color: 'black',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export function renderAffiliation({ affiliation, hasDivider = true }) {
  const classes = useStyles();
  console.log('affiliation', affiliation);
  return (
    <div key={affiliation.id}>
      <ListItem className={classes.listItem} component="div">
        <AvatarAndContentContainer>
          <AffiliationAvatar affiliation={affiliation} />
          <AffiliationContent affiliation={affiliation} />
        </AvatarAndContentContainer>
        <AffiliationControls affiliation={affiliation} />
      </ListItem>
      {hasDivider && (
        <Divider className={classes.divider} variant="fullWidth" />
      )}
    </div>
  );
}

const AvatarAndContentContainer = styled.div`
  display: flex;
  align-items: center;
`;
