import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import { formatDateString } from '../../helpers';

function renderAffiliationSecondaryContent({ affiliation }) {
  return (
    <>
      <StyledSubtitle1 variant="subtitle1">{`${affiliation.title}`}</StyledSubtitle1>
      <StyledSubtitle1 variant="subtitle1">{`${formatDateString(
        affiliation.fromDate
      )} to ${formatDateString(affiliation.throughDate)} `}</StyledSubtitle1>
    </>
  );
}

const StyledSubtitle1 = styled(Typography)`
  font-size: 12px;
`;

export default renderAffiliationSecondaryContent;
