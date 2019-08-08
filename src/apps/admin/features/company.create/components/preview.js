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
    marginLeft: '1.5rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    marginRight: '.5rem',
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

export function CompanyCreatePreview({ values, touched }) {
  const cardClasses = useStyles();
  const { logo, yearFounded, name, locationjson, description, links } = values;

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

  if (
    logo ||
    name ||
    description ||
    Object.keys(locationjson).length > 0 ||
    Object.keys(touched).length > 0
  ) {
    return (
      <Card className={cardClasses.card}>
        {logo && (
          <CardMedia
            className={cardClasses.cover}
            image={logo}
            title={'test'}
          />
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
              {name} {name && `(${new Date(yearFounded).getYear() + 1900})`}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              color="primary"
              style={{
                letterSpacing: '-.5px',
                textDecoration: 'none',
              }}
            >
              {locationjson.formatted_address &&
                `${locationjson.formatted_address}`}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h6"
              color="textPrimary"
              style={{
                letterSpacing: '-.5px',
                textDecoration: 'none',
                lineHeight: 1.35,
              }}
            >
              {description}
            </Typography>

            <CompanyIntelligenceContainer colNum={getColumns()}>
              <CompanyCategories company={values} wrapper={SOMECOMP} />
            </CompanyIntelligenceContainer>
            <CompanyContactContainer>
              <CompanyContactLinks links={links} name={name} expanded={false} />
            </CompanyContactContainer>
          </CardContent>
        </div>
      </Card>
    );
  } else {
    return null;
  }
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
  @media (max-width: 480px) {
    grid-template-columns: repeat(8, 1fr);
    max-width: 100%;
  }
`;

const CompanyIntelligenceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.colNum}, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 15px;
  grid-row-gap: 10px;
  margin-top: 10px;
  align-items: center;

  @media (max-width: 480px) {
    grid-template-columns: 100%;
    grid-column-gap: 10px;
  }
`;

export default CompanyCreatePreview;

const SOMECOMP = props => {
  return (
    <Typography
      variant="subtitle1"
      component="h5"
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
