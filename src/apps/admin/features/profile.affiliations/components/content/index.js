import React from 'react';
import { makeStyles } from '@material-ui/styles';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';
import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  listItem: {
    minWidth: '300px',
  },
}));

export function AffiliationContent({ affiliation, ...props }) {
  const classes = useStyles();
  return (
    <div>
      <div>{renderPrimaryContent({ affiliation })}</div>
      <div>{renderSecondaryContent({ affiliation })}</div>
    </div>
  );
}
