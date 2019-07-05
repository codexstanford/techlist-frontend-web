import React from 'react';
import { formatDateString } from '../../helpers';

function renderAffiliationSecondaryContent({ affiliation }) {
  return (
    <div>
      <span>{`${affiliation.title}`}</span>
      <br />
      <span>{`${formatDateString(affiliation.fromDate)} to ${formatDateString(
        affiliation.throughDate
      )} `}</span>
      <p>{`${affiliation.description}`}</p>
    </div>
  );
}

export default renderAffiliationSecondaryContent;
