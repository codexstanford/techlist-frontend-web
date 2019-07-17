import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/styles';
import styled from 'styled-components';
import { CompanyContactLinks } from '../../../../../templates/company/companyContactLinks';
import { CompanyCategories } from '../../../../../templates/company/companyCategories';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginTop: '1rem',
    marginBottom: '1rem',
    minHeight: '8rem',
    '@media(max-width: 480px)': {
      flexDirection: 'column',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    maxWidth: 212,
  },
  root: {
    backgroundSize: '100%',
  },
  cover: {
    minWidth: '6rem',
    maxHeight: '6rem',
    marginLeft: 10,
    marginTop: 10,
    '@media(max-width: 480px)': {
      flexDirection: 'column',
      maxWidth: '6rem',
      minHeight: '6rem',
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: `1rem`,
    paddingBottom: `1rem`,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export function CompanyCreatePreview({ values }) {
  const cardClasses = useStyles();
  const { logo } = values;

  const getColumns = () => {
    if (values.categories) {
      if (values.categories.length > 12) {
        return 4;
      }
      if (values.categories.length > 6) {
        return 3;
      }
      return 2;
    }
  };

  return (
    <Card className={cardClasses.card}>
      {logo && (
        <CardMedia className={cardClasses.cover} image={logo} title={'test'} />
      )}
      <div className={cardClasses.details}>
        <CardContent>
          <Typography
            variant="h6"
            color="textPrimary"
            style={{
              fontWeight: '800',
              letterSpacing: '-.5px',
              textDecoration: 'none',
            }}
          >
            {values.name}{' '}
            {values.name &&
              `(${new Date(values.yearFounded).getYear() + 1900})`}
          </Typography>
          <Typography
            variant="body2"
            component="body2"
            color="primary"
            style={{
              letterSpacing: '-.5px',
              textDecoration: 'none',
            }}
          >
            {values.locationjson.formatted_address &&
              `${values.locationjson.formatted_address}`}
          </Typography>
          <Typography
            variant="subtitle1"
            component="subtitle1"
            color="black"
            style={{
              letterSpacing: '-.5px',
              textDecoration: 'none',
              lineHeight: 1.35,
            }}
          >
            {values.description}
          </Typography>

          <CompanyIntelligenceContainer colNum={getColumns()}>
            <CompanyCategories company={values} wrapper={SOMECOMP} />
          </CompanyIntelligenceContainer>
          <CompanyContactContainer>
            <CompanyContactLinks
              links={values.links}
              name={values.name}
              expanded={false}
            />
          </CompanyContactContainer>
        </CardContent>
      </div>
    </Card>
  );
}

const CompanyContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 10px;
  margin-top: 10px;
  max-width: 225px;
  justify-items: center;
  align-items: center;
`;

const CompanyIntelligenceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.colNum}, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 15px;
  grid-row-gap: 10px;
  margin-top: 10px;
  align-items: center;
`;

export default CompanyCreatePreview;

const SOMECOMP = props => {
  return (
    <Typography
      variant="subtitle1"
      component="subtitle1"
      color="primary"
      style={{
        letterSpacing: '-.5px',
        textDecoration: 'none',
        lineHeight: 1.35,
      }}
    >
      {props.children}
    </Typography>
  );
};
