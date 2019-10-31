import React from 'react';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';
import styled from 'styled-components';
import TruncateText from '../../../../../../helpers/truncateText';

export function CompanyContent({ company, ...props }) {
  return (
    <Container>
      <Wrapper>
        <ContentWrapper>
          {renderPrimaryContent({ company })}
          {renderSecondaryContent({ company })}
        </ContentWrapper>
        <CompanyDescription>
          {company.description && (
            <TruncateText str={company.description} length={125} />
          )}
        </CompanyDescription>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  min-width: 300px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ContentWrapper = styled.div`
  flex: 1 0 1rem;
`;

const CompanyDescription = styled.p`
  display: none;
  margin: 0;
  flex: 2 0 24rem;
  @media (max-width: 960px) {
    display: block;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;
