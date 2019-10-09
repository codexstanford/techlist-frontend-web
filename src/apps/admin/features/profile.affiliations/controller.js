import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { renderAffiliation } from './helpers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  expansionPanel: {
    boxShadow: 'none',
    width: '100%',
  },
}));

export default function AffiliationsListController({
  affiliations,
  first,
  second,
  rest,
  refetch,
  ...props
}) {
  const classes = useStyles();

  if (affiliations) {
    return (
      <>
        {first &&
          renderAffiliation({
            affiliation: first,
            refetch,
            hasDivider: false,
          })}
        {second &&
          renderAffiliation({
            affiliation: second,
            refetch,
            hasDivider: false,
          })}
        {rest && rest.length > 0 ? (
          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} />
            <ExpansionPanelDetails>
              <List className={classes.root}>
                {rest.map(affiliation =>
                  renderAffiliation({ affiliation, refetch })
                )}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : null}
      </>
    );
  }
}
