import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import CompanyControls from '../components/controls';
import { CompanyAvatar, CompanyContent } from '../components';
import TruncateText from '../../../../../helpers/truncateText';
import styled from 'styled-components';

export function renderCompany({ company, user, hasDivider = true }) {
  return (
    <>
      <StyledListItem key={company.id} component="div">
        <AvatarAndContentContainer>
          <CompanyAvatar company={company} />
          <CompanyContent company={company} />
        </AvatarAndContentContainer>
        <CompanyControls company={company} user={user} />
      </StyledListItem>
      <CompanyDescription>
        {company.description && (
          <TruncateText str={company.description} length={125} />
        )}
      </CompanyDescription>

      {hasDivider && <StyledDivider variant="fullWidth" />}
    </>
  );
}

const AvatarAndContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyDescription = styled.p`
  padding: 0 14px;
  @media (max-width: 960px) {
    display: none;
  }
  @media (max-width: 800px) {
    display: block;
  }
`;

const StyledDivider = styled(Divider)({
  color: 'black',
});

const StyledListItem = styled(ListItem)({
  diplay: 'flex',
  justifyContent: 'space-between',
  padding: 0,
});
