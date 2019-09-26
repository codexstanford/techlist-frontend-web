import React from 'react';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';
import styled from 'styled-components';

export function CompanyContent({ company, ...props }) {
  return (
    <CompanyContentContainer>
      {renderPrimaryContent({ company })}
      {renderSecondaryContent({ company })}
    </CompanyContentContainer>
  );
}

const CompanyContentContainer = styled.div`
  min-width: 300px;
`;
