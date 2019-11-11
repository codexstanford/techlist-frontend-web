import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import CompanyControls from '../components/controls';
import { CompanyAvatar, CompanyContent } from '../components';
import TruncateText from '../../../../../helpers/truncateText';
import styled from 'styled-components';

export function renderCompany({ company, user, hasDivider = true }) {
  return (
    <CompanyContainer isPendingReview={company.metadata.isPendingReview}>
      <StyledListItem key={company.id} component="div">
        <AvatarAndContentContainer>
          <CompanyAvatar company={company} />
          <CompanyContent company={company} />
        </AvatarAndContentContainer>
        {company.metadata.isPendingReview ? (
          <Pending>Pending </Pending>
        ) : (
          <CompanyControls company={company} user={user} />
        )}
      </StyledListItem>
      <CompanyDescription>
        {company.description && (
          <TruncateText str={company.description} length={125} />
        )}
      </CompanyDescription>

      {hasDivider && <StyledDivider variant="fullWidth" />}
    </CompanyContainer>
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

const CompanyContainer = styled.div(props =>
  props.isPendingReview
    ? {
        opacity: 0.8,
        pointerEvents: 'none',
        backgroundColor: '#DCDCDC',
      }
    : {}
);

const StyledDivider = styled(Divider)({
  color: 'black',
});

const StyledListItem = styled(ListItem)({
  diplay: 'flex',
  justifyContent: 'space-between',
  padding: 0,
});

const Pending = styled.span`
  padding: 1em;
  align-self: flex-start;
`;
