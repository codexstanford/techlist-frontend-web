import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export function HeaderLeft(props) {
  const { sections, classes } = props;

  return (
    <React.Fragment>
      <div className={classes.sectionDesktop}>
        {sections &&
          sections.map(section => {
            return (
              <Button
                key={section.title}
                color="inherit"
                size="small"
                component={props => (
                  <Link to={section.to} component={GatsbyLink} {...props} />
                )}
              >
                {section.title}
              </Button>
            );
          })}
      </div>
    </React.Fragment>
  );
}

HeaderLeft.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
};

HeaderLeft.defaultProps = {
  sections: [],
};

const styles = theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {},
});

export default withStyles(styles)(HeaderLeft);
