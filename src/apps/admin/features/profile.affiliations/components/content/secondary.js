import React from 'react';
import { formatDateString } from '../../helpers';

function renderAffiliationSecondaryContent({ affiliation }) {
  return (
    <div>
      {affiliation.title && (
        <>
          <span>{`${affiliation.title}`}</span> <br />
        </>
      )}

      <span>{`${formatDateString(affiliation.fromDate)} to ${formatDateString(
        affiliation.throughDate
      )} `}</span>
      {affiliation.description && `${affiliation.description}`}
    </div>
  );
}

export default renderAffiliationSecondaryContent;
