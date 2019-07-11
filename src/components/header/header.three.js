import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
// import { isLoggedIn, logout } from '../../services/auth';
import Avatar from '@material-ui/core/Avatar';
import { Query } from 'react-apollo';
import { useUser } from '../../store/user-context';
import gql from 'graphql-tag';
import CreateCompanyScreen from '../../apps/admin/routes/company/index';

export function HeaderLeft({ sections, classes, ...props }) {
  const [showCompanyScreen, toggleCompanyScreen] = useState(false);
  const { data, logout } = useUser();
  const { user } = data;

  const isUserLoggedIn = user ? true : false;

  // useEffect(() => {
  //   Auth.currentAuthenticatedUser()
  //     .then(data => {
  //       if (data && data !== 'not authenticated') {
  //         setUser(data);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, []);

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
                component={props => (
                  <Link to={section.to} component={GatsbyLink} {...props} />
                )}
              >
                {section.title}
              </Button>
            );
          })}
        <React.Fragment>
          {isUserLoggedIn ? (
            <Button
              color="primary"
              variant="outlined"
              size="small"
              aria-label="Get Listed"
              onClick={() => toggleCompanyScreen(!showCompanyScreen)}
              style={{
                marginLeft: '10px',
              }}
            >
              Get Listed
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              size="small"
              aria-label="Get Listed"
              component={props => (
                <Link to="/app/login/" component={GatsbyLink} {...props} />
              )}
              style={{
                marginLeft: '10px',
              }}
            >
              Get Listed
            </Button>
          )}
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

const GET_CURRENT_USER_QUERY = gql`
  query GetMe {
    me {
      id
      cognitoId
      handle
      person {
        id
        affiliations {
          id
          role
          startDate
          company {
            id
            name
            yearFounded
            description
          }
        }
        profile {
          id
          avatar
          firstName
          lastName
          links {
            id
            type
            url
          }
        }
      }
    }
  }
`;
