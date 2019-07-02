import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import { isLoggedIn, logout } from '../../services/auth';
import Avatar from '@material-ui/core/Avatar';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export function HeaderLeft({ sections, classes, ...props }) {
  const isUserLoggedIn = isLoggedIn();

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

        {isUserLoggedIn ? (
          <React.Fragment>
            <Query query={GET_CURRENT_USER_QUERY}>
              {({ loading, data, error }) => {
                if (loading) {
                  return null;
                }
                if (error) {
                  logout();
                }
                return (
                  <Link to="/app/profile/" component={GatsbyLink} {...props}>
                    <Avatar
                      src={data.me.person.profile.avatar}
                      style={{ marginLeft: 10 }}
                      imgProps={{
                        style: { maxWidth: '100%', maxHeight: '100%' },
                      }}
                    />
                  </Link>
                );
              }}
            </Query>
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
