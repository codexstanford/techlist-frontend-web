import React from 'react';
import Grid from '@material-ui/core/Grid';
import SidekickItem from './sidekickItem';

export function Sidekick(props) {
  const { classes, data } = props;
  return (
    <React.Fragment>
      <Grid container spacing={1} className={classes.cardGrid}>
        {data
          .filter(item => {
            return item.content && item.imageUrl;
          })
          .slice(0, 3)
          .map(item => {
            return (
              <Grid key={item.id} item xs={12} md={4}>
                <SidekickItem {...item} classes={classes} />
              </Grid>
            );
          })}
      </Grid>
    </React.Fragment>
  );
}

export default Sidekick;
