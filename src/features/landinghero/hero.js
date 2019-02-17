import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export function Hero(props) {
  const { classes, data } = props;
  console.log(data);
  const { title, description } = data;
  return (
    <React.Fragment>
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {title}
              </Typography>
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
