import React from 'react';
import Chip from '@material-ui/core/Chip';
import { DateTime } from 'luxon';
import { navigate } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import { faBuilding, faLink } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faAngellist,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons';

import { GET_COMPANY_TARGET_MARKETS } from '../../graphql/queries';

export function formatCompanyFoundedDate(date) {
  if (date === undefined) {
    return;
  }
  const result = DateTime.fromISO(date).year;
  return result;
}

export function formatBingNewsPublishedDate(date) {
  if (date === undefined) {
    return;
  }
  const result = DateTime.fromISO(date);
  return result.toRelative();
}

export function formatCompanyCategories(categories) {
  if (categories === undefined || '') {
    return;
  }
  return categories.map(item => {
    return (
      <Chip
        color="primary"
        key={item.id}
        label={toTitleCase(item.payload.split('_').join(' '))}
        onClick={() =>
          navigate(
            `/tags/${item.payload
              .split('_')
              .join('-')
              .toLowerCase()}`
          )
        }
      />
    );
  });
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function formatCompanyTargetMarkets(company) {
  if (company.targetMarkets === undefined || company.targetMarkets === '') {
    return null;
  }

  let targetMarkets = company.targetMarkets;

  if (typeof targetMarkets === 'string') {
    const { data, loading, error } = useQuery(GET_COMPANY_TARGET_MARKETS);
    const { organizationTargetMarkets } = data;

    organizationTargetMarkets.forEach(item => {
      if (targetMarkets === item.id) {
        targetMarkets = [item];
      }
    });
  }

  return targetMarkets.map(item => {
    return (
      <Chip
        color="primary"
        key={item.id}
        label={toTitleCase(item.payload.split('_').join(' '))}
      />
    );
  });
}

export function formatCompanyLink(link) {
  return link
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

export function formatCategoryName(str) {
  if (str.toUpperCase() !== str) {
    return str.toUpperCase().replace(/ /g, '_');
  } else {
    return str
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, ' ')
      .replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });
  }
}

export const chooseLinkIcon = linkType => {
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
