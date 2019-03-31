import React from 'react';
import Chip from '@material-ui/core/Chip';
import { DateTime } from 'luxon';

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

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function formatCompanyTargetMarkets(company) {
  if (company.targetMarkets === undefined) {
    return null;
  }
  return company.targetMarkets.map(item => {
    return (
      <Chip
        color="primary"
        key={item.id}
        label={toTitleCase(item.name.split('_').join(' '))}
      />
    );
  });
}

export function formatCompanyOperatingModels(company) {
  return (
    company.operatingModels
      // .filter(item => item.name !== 'UNKNOWN')
      .map(item => {
        return (
          <Chip color="primary" key={item.id} label={toTitleCase(item.name)} />
        );
      })
  );
}
