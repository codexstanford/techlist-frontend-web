import React from 'react';
import { formatDateString } from '../../helpers';
import truncateText from '../../../../../../helpers/truncateText';

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
