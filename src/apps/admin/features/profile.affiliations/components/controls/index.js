import React from 'react';
import styled from 'styled-components';

import EditAffiliationControl from './edit';
import DeleteAffiliationControl from './delete';

export function AfilliationControls({ affiliation, refetch, ...props }) {
  return (
    <StyledListItem>
      <EditAffiliationControl affiliation={affiliation} />
      <DeleteAffiliationControl affiliation={affiliation} refetch={refetch} />
    </StyledListItem>
  );
}

const StyledListItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-start;
  flex-grow: 1;
`;

export default AfilliationControls;
