import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { renderCompany } from './helpers';

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

export default function CompaniesListController({ companies, ...props }) {
  const classes = useStyles();
  const [first, second, ...rest] = companies;

  return (
    <>
      {first && renderCompany({ company: first, hasDivider: false })}
      {second && renderCompany({ company: second, hasDivider: false })}
      {rest && rest.length > 0 ? (
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} />
          <ExpansionPanelDetails>
            <List className={classes.root}>
              {rest.map(company => {
                renderCompany({ company });
              })}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ) : null}
    </>
  );
}
