import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

import CompanyControls from '../components/controls';
import { CompanyAvatar, CompanyContent } from '../components';
import truncateText from '../../../../../helpers/truncateText';

const useStyles = makeStyles({
  divider: {
    color: 'black',
  },
  listItem: {
    diplay: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
});

export function renderCompany({ company, hasDivider = true }) {
  const classes = useStyles();
  return (
    <>
      <ListItem key={company.id} component="div" className={classes.listItem}>
        <AvatarAndContentContainer>
          <CompanyAvatar company={company} />
          <CompanyContent company={company} />
        </AvatarAndContentContainer>
        <CompanyControls company={company} />
      </ListItem>
      <CompanyDescription>
        {company.description && truncateText(company.description, 125)}
      </CompanyDescription>

      {hasDivider && (
        <Divider className={classes.divider} variant="fullWidth" />
      )}
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
