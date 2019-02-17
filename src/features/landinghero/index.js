import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Hero from './hero';
import Sidekick from './sidekick';

export function LandingHero(props) {
  const {
    data: {
      allNews: { edges: data },
    },
  } = props;

  const [heroData, ...sidekickData] = data.map(item => item.node);

  return (
    <React.Fragment>
      <Hero data={heroData} classes={props.classes} />
      <Sidekick data={sidekickData.slice(0, 3)} classes={props.classes} />
    </React.Fragment>
  );
}

export default withStyles(styles)(LandingHero);
