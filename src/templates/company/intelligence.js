import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

import { CompanyCategories } from './companyCategories';
import {
  formatCompanyFoundedDate,
  formatCompanyTargetMarkets,
} from './helpers';

export function CompanyIntelligence({ classes, company, ...props }) {
  const TargetMarkets = formatCompanyTargetMarkets(company);

  return (
    <Card className={classes.card} style={{ maxWidth: '100%' }}>
      <CardContent>
        <Typography component="h3" variant="h6">
          Business Intelligence
        </Typography>
        <ListItem>
          <ListItemText primary={`Year Founded`} />
          <Chip
            color="primary"
            label={
              company.yearFounded
                ? formatCompanyFoundedDate(company.yearFounded)
                : 'N/A'
            }
          />
        </ListItem>
        {TargetMarkets && TargetMarkets.length > 0 ? (
          <ListItem>
            <ListItemText primary={`Target Markets`} />

            {TargetMarkets[0]}
          </ListItem>
        ) : null}

        <OperatingModelsItem>
          <OperatingModelsListItemText primary={`Operating Models`} />
          <OperatingModelsChipsContainer>
            <CompanyCategories chip company={company} />
          </OperatingModelsChipsContainer>
        </OperatingModelsItem>
      </CardContent>
    </Card>
  );
}

const OperatingModelsItem = styled(ListItem)`
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const OperatingModelsListItemText = styled(ListItemText)`
  min-width: 150px;
  @media (max-width: 480px) {
    text-align: center;
  }
`;

const OperatingModelsChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 480px) {
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
`;
