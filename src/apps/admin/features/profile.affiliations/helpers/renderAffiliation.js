import React from 'react';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

import AffiliationControls from '../components/controls';
import { AffiliationAvatar, AffiliationContent } from '../components';

export function renderAffiliation({ affiliation, refetch, hasDivider = true }) {
  if (affiliation.organization !== null) {
    return (
      <StyledWrapper key={affiliation.id}>
        <AffiliationAvatar affiliation={affiliation} />
        <AffiliationContent affiliation={affiliation} />
        <AffiliationControls affiliation={affiliation} refetch={refetch} />

        {hasDivider && <StyledDivider variant="fullWidth" />}
      </StyledWrapper>
    );
  }
  return null;
}

const StyledDivider = styled(Divider)`
  display: flex;
  align-items: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;
