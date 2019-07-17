import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useUser } from '../../store/user-context';
import CreateCompanyScreen from '../../apps/admin/routes/company/index';
import { navigate } from '@reach/router';

export function HeaderLeft({ sections, classes, ...props }) {
  const [showCompanyScreen, toggleCompanyScreen] = useState(false);
  const { data, logout } = useUser();
  const { user } = data;

  function getAvatar(user) {
    const { person } = user;
    if (!person) {
      return 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg';
    }

    const { profile } = person;
    if (!profile) {
      return 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg';
    }

    const { avatar } = profile;
    if (!avatar) {
      return 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg';
    }

    return avatar;
  }

  return (
    <React.Fragment>
      <CreateCompanyScreen
        open={showCompanyScreen}
        onCancel={toggleCompanyScreen}
        classes={classes}
        user={user}
      />
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
          <Link to="/app/profile/" component={GatsbyLink} {...props}>
            <Avatar
              src={getAvatar(user)}
              style={{ marginLeft: 10 }}
              imgProps={{
                style: { maxWidth: '100%', maxHeight: '100%' },
              }}
            />
          </Link>
        ) : (
          <React.Fragment>
            <Button
              color="primary"
              size="small"
              component={React.forwardRef((props, ref) => (
                <Link
                  ref={ref}
                  to="/app/login/"
                  component={GatsbyLink}
                  {...props}
                />
              ))}
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
