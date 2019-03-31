import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';

import Chip from '@material-ui/core/Chip';

import {
  formatCompanyFoundedDate,
  formatCompanyOperatingModels,
  formatCompanyTargetMarkets,
} from './helpers';

export function CompanyIntelligence({ classes, company, ...props }) {
  const OperatingModels = formatCompanyOperatingModels(company);
  const TargetMarkets = formatCompanyTargetMarkets(company);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h3" variant="h6">
          Business Intelligence
        </Typography>
        <ListItem>
          <ListItemText primary={`Year Founded`} />
          <Chip
            color="primary"
            label={formatCompanyFoundedDate(company.yearFounded)}
          />
        </ListItem>
        {OperatingModels.length > 0 ? (
          <ListItem>
            <ListItemText primary={`Operating Models`} />
            {OperatingModels}
          </ListItem>
        ) : null}
        {TargetMarkets.length > 0 ? (
          <ListItem>
            <ListItemText primary={`Target Markets`} />

            {TargetMarkets}
          </ListItem>
        ) : null}
      </CardContent>
    </Card>
  );
}
