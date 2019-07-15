import React from 'react';
import Chip from '@material-ui/core/Chip';
import { DateTime } from 'luxon';
import { navigate } from '@reach/router';
import { Link as GatsbyLink } from 'gatsby';
import Link from '@material-ui/core/Link';
import { useQuery, useMutation } from 'react-apollo-hooks';
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

export function formatCompanyOperatingModels(company) {
  if (company.categories !== undefined) {
    return company.categories.map(item => {
      return (
        <Chip
          color="primary"
          key={item.id}
          label={toTitleCase(item.label ? item.label : item.payload)}
          style={{ margin: 2 }}
        />
      );
    });
  }
}

export function formatCompanyLink(link) {
  return link
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}
