import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { useUser } from '../../store/user-context';
import { navigate } from '@reach/router';
import renderAvatar from './helpers/renderAvatar';

export function HeaderLeft({ sections, classes, ...props }) {
  const [showCompanyScreen, toggleCompanyScreen] = useState(false);
  const { data, logout } = useUser();
  const { user } = data;

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
                component={React.forwardRef((props, ref) => (
                  <Link
                    ref={ref}
                    to={section.to}
                    component={GatsbyLink}
                    {...props}
                  />
                ))}
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
            onClick={() =>
              user
                ? toggleCompanyScreen(!showCompanyScreen)
                : navigate('/app/login/')
            }
            style={{
              marginLeft: '10px',
            }}
          >
            Get Listed
          </Button>
        </React.Fragment>

        {user ? (
          renderAvatar(user)
        ) : (
          <React.Fragment>
            <Button
              color="primary"
              size="small"
              onClick={() => navigate('/app/login/')}
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
