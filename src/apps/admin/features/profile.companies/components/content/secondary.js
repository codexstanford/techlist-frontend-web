import React from 'react';
import { formatDateString } from '../../helpers';

function renderCompanySecondaryContent({ company }) {
  return (
    <div>
      <span>{`${company.title}`}</span>
      <br />
      <span>{`${formatDateString(company.fromDate)} to ${formatDateString(
        company.throughDate
      )} `}</span>
      <p>{`${company.description}`}</p>
    </div>
  );
}

export default renderCompanySecondaryContent;
