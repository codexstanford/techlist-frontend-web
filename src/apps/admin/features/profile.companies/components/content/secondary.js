import React from 'react';
import { formatDateString } from '../../helpers';

function renderCompanySecondaryContent({ company }) {
  return (
    <div>
      {company.title && (
        <>
          <span>{`${company.title}`}</span>
          <br />
        </>
      )}
      {
        <span>{`${
          company.yearFounded !== null
            ? formatDateString(company.yearFounded)
            : 'N/A'
        }`}</span>
      }
    </div>
  );
}

export default renderCompanySecondaryContent;
