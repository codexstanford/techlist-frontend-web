import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';

// This component actually appears in the 'header right' position.

export function HeaderLeft(props) {
  const {
    sections,
    classes,
    isUserAuthenticated,
    handleUserAuthenticationAction,
  } = props;

  return (
    <React.Fragment>
      <div className={classes.sectionDesktop}>
        {sections &&
          sections.map(section => {
            return (
              <Button
                key={section.title}
                aria-label={section.title}
                color="primary"
                component={props => (
                  <Link to={section.to} component={GatsbyLink} {...props} />
                )}
              >
                {section.title}
              </Button>
            );
          })}
        <React.Fragment>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            aria-label="Get Listed"
            component={props => (
              <Link to="/app/profile/" component={GatsbyLink} {...props} />
            )}
            style={{
              marginLeft: '10px',
            }}
          >
            Get Listed
          </Button>
        </React.Fragment>

        {isUserAuthenticated ? (
          <React.Fragment>
            <IconButton
              aria-haspopup="true"
              onClick={Auth.signOut()}
              color="primary"
            >
              <AccountCircle />
            </IconButton>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              color="primary"
              size="small"
              component={props => (
                <Link to="/app/login/" component={GatsbyLink} {...props} />
              )}
              style={{
                marginLeft: '10px',
              }}
            >
              Login
            </Button>
          </React.Fragment>
        )}
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

export default HeaderLeft;
