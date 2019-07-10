import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginTop: '1rem',
    marginBottom: '1rem',
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
  cover: {
    width: 151,
    height: 151,
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

  return (
    <Card className={cardClasses.card}>
      {logo && (
        <CardMedia className={cardClasses.cover} image={logo} title={'test'} />
      )}
      <div className={cardClasses.details}>
        <CardContent>
          <Typography
            variant="h6"
            color="black"
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
            variant="subtitle1"
            component="subtitle1"
            color="black"
            style={{
              letterSpacing: '-.5px',
              textDecoration: 'none',
            }}
          >
            {values.description}
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
        </CardContent>
      </div>
    </Card>
  );
}

export default CompanyCreatePreview;
