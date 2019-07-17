import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { CompanyContactLinks } from './companyContactLinks';

export function CompanyContact({ classes, links, name, ...rest }) {
  return (
    <Card classes={classes}>
      <CardContent>
        <Typography component="h3" variant="h6" gutterBottom>
          Company Contacts
        </Typography>
        <CompanyContactLinks links={links} name={name} />
      </CardContent>
    </Card>
  );
}
