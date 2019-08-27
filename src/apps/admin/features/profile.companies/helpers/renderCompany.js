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
      <p style={{ padding: '0 28px' }}>
        {company.description &&
          truncateText(company.description, 125, {
            truncated: <span>...m</span>,
            expanded: <button>beep</button>,
          })}
      </p>

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
