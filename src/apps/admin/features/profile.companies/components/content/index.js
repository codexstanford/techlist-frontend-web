import React from 'react';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import truncateText from '../../../../../../helpers/truncateText';

const useStyles = makeStyles(() => ({
  listItem: {
    minWidth: '300px',
  },
}));

export function CompanyContent({ company, ...props }) {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.listItem}
      component={() => (
        <Wrapper>
          <ContentWrapper>
            {renderPrimaryContent({ company })}
            {renderSecondaryContent({ company })}
          </ContentWrapper>
          <CompanyDescription>
            {company.description && truncateText(company.description, 125)}
          </CompanyDescription>
        </Wrapper>
      )}
    />
  );
}

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
