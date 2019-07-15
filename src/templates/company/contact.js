import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBuilding, faLink } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faAngellist,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import _ from 'lodash';
import { formatCompanyLink } from './helpers';

export function validateCompanyWebsiteUrl(url) {
  if (url && !url.startsWith('http')) {
    return `http://${url}`;
  }
  return url;
}

export default function CompanyContact({ links, name, ...rest }) {
  const getIcon = linkType => {
    switch (linkType) {
      case 'UrlTwitter':
        return faTwitter;
      case 'UrlAngellist':
        return faAngellist;
      case 'UrlCrunchbase':
        return faBuilding;
      case 'UrlFacebook':
        return faFacebookF;
      default:
        return faLink;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography component="h3" variant="h6" gutterBottom>
          Company Contacts
        </Typography>
        {links.map(link => {
          if (link.type === 'UrlWebsite') {
            return (
              <ListItemText
                style={{ marginBottom: 10 }}
                primary={
                  <Link
                    href={validateCompanyWebsiteUrl(link.payload)}
                    target="_blank"
                  >
                    <FontAwesomeIcon
                      size="lg"
                      icon={faGlobe}
                      style={{ marginRight: 10 }}
                    />
                    {name} Website
                  </Link>
                }
              />
            );
          } else if (link.type) {
            return (
              <ListItemText
                style={{ marginBottom: 10 }}
                primary={
                  <Link href={link.payload} target="_blank">
                    <FontAwesomeIcon
                      size="lg"
                      icon={getIcon(link.type)}
                      style={{ marginRight: 10 }}
                    />
                    {formatCompanyLink(
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
        })}
      </CardContent>
    </Card>
  );
}
