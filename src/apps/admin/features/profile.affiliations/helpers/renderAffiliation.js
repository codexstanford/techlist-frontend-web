import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

import AffiliationControls from '../components/controls';
import { AffiliationAvatar, AffiliationContent } from '../components';

const useStyles = makeStyles({
  divider: {
    color: 'black',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

export function renderAffiliation({ affiliation, refetch, hasDivider = true }) {
  const classes = useStyles();
  if (affiliation.organization !== null) {
    return (
      <div key={affiliation.id} className={classes.wrapper}>
        <AffiliationAvatar affiliation={affiliation} />
        <AffiliationContent affiliation={affiliation} />
        <AffiliationControls affiliation={affiliation} refetch={refetch} />

        {hasDivider && (
          <Divider className={classes.divider} variant="fullWidth" />
        )}
      </div>
    );
  }
  return null;
}

const AvatarAndContentContainer = styled.div`
  display: flex;
  align-items: center;
`;
