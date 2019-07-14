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
      {`${affiliation.description}`}
    </div>
  );
}

export default renderAffiliationSecondaryContent;
