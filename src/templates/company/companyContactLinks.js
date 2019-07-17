import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { formatCompanyLink, chooseLinkIcon } from './helpers';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export function validateCompanyWebsiteUrl(url) {
  if (url && !url.startsWith('http')) {
    return `http://${url}`;
  }
  return url;
}

export function CompanyContactLinks({ links, name, expanded, ...rest }) {
  return links.map(link => {
    if (link.type === 'UrlWebsite') {
      return (
        <ListItemText
          style={{
            marginBottom: 10,
            paddingLeft: 16,
            maxWidth: expanded ? null : 20,
            margin: expanded ? null : 0,
            padding: expanded ? null : 0,
          }}
          key={link.id}
          primary={
            <Link
              href={validateCompanyWebsiteUrl(link.payload)}
              target="_blank"
            >
              <FontAwesomeIcon
                size="lg"
                icon={faGlobe}
                style={{
                  marginRight: expanded ? 10 : 0,
                  maxWidth: 20,
                }}
              />
              {expanded && `${name} Website`}
            </Link>
          }
        />
      );
    } else if (link.type) {
      return (
        <ListItemText
          style={{
            marginBottom: 10,
            paddingLeft: 16,
            maxWidth: expanded ? null : 20,
            margin: expanded ? null : 0,
            padding: expanded ? null : 0,
          }}
          key={link.id}
          primary={
            <Link href={link.payload} target="_blank">
              <FontAwesomeIcon
                size="lg"
                icon={chooseLinkIcon(link.type)}
                style={{
                  marginRight: expanded ? 10 : 0,
                  maxWidth: 20,
                }}
              />
              {expanded &&
                formatCompanyLink(
                  link.type.slice(0, 3) === 'Url'
                    ? link.type.slice(3)
                    : link.type
                )}
            </Link>
          }
        />
      );
    } else {
      return null;
    }
  });
}

CompanyContactLinks.defaultProps = {
  expanded: true,
};

CompanyContactLinks.propTypes = {
  expanded: PropTypes.bool,
};
