import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faAngellist } from '@fortawesome/free-brands-svg-icons';
import _ from 'lodash';

export function CompanyContact({ classes, company, ...rest }) {
  const {
    urlAngellist,
    urlCrunchbase,
    urlTwitter,
    urlWebsite,
  } = company.contact;

  return (
    <Card>
      <CardContent>
        <Typography component="h3" variant="h6" gutterBottom>
          Company Contacts
        </Typography>
        {urlWebsite && (
          <>
            <ListItemText
              style={{ marginBottom: 10 }}
              primary={
                <Link href={urlWebsite} target="_blank">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faGlobe}
                    style={{ marginRight: 10 }}
                  />
                  {company.name} Website
                </Link>
              }
            />
          </>
        )}
        {urlTwitter && (
          <>
            <ListItemText
              style={{ marginBottom: 10 }}
              primary={
                <Link href={urlTwitter} target="_blank">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faTwitter}
                    style={{ marginRight: 10 }}
                  />
                  Twitter
                </Link>
              }
            />
          </>
        )}
        {urlAngellist && (
          <>
            <ListItemText
              style={{ marginBottom: 10 }}
              primary={
                <Link href={urlAngellist} target="_blank">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faAngellist}
                    style={{ marginRight: 10 }}
                  />
                  Angellist
                </Link>
              }
            />
          </>
        )}
        {urlCrunchbase && (
          <>
            <ListItemText
              style={{ marginBottom: 10 }}
              primary={
                <Link href={urlCrunchbase} target="_blank">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faBuilding}
                    style={{ marginRight: 10 }}
                  />
                  Crunchbase
                </Link>
              }
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
