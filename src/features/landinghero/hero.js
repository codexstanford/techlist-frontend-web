import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

export function Hero(props) {
  const { classes, data } = props;
  const { title, description, content } = data;
  return (
    <React.Fragment>
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Link
                href={data.link}
                color="inherit"
                underline="none"
                variant="h3"
              >
                {title}
              </Link>

              <Typography variant="h5" color="inherit" paragraph>
                {description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default Hero;
