import React from 'react';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditCompany from '../../../../components/company.edit';
import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

import { EditCompanyControl } from './edit';
import { DeleteCompanyControl } from './delete';

export function AfilliationControls({ company, refetch, user, ...props }) {
  return (
    <AffiliationControlsContainer>
      <EditCompanyControl company={company} user={user} />
      <DeleteCompanyControl company={company} refetch={refetch} user={user} />
    </AffiliationControlsContainer>
  );
}

const AffiliationControlsContainer = styled.div`
  align-self: flex-start;
  min-width: 103px;
`;

export default AfilliationControls;
