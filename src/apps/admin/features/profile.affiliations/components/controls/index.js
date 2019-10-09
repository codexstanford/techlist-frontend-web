import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { EditAffiliationControl } from './edit';
import { DeleteAffiliationControl } from './delete';

const useStyles = makeStyles(theme => ({
  listItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    flexGrow: 1,
  },
}));

export function AfilliationControls({ affiliation, refetch, ...props }) {
  const classes = useStyles();
  return (
    <div className={classes.listItem}>
      <EditAffiliationControl affiliation={affiliation} />
      <DeleteAffiliationControl affiliation={affiliation} refetch={refetch} />
    </div>
  );
}

export default AfilliationControls;
