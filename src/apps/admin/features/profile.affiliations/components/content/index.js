import React from 'react';
import renderPrimaryContent from './primary';
import renderSecondaryContent from './secondary';

export function AffiliationContent({ affiliation, ...props }) {
  return (
    <div>
      <div>{renderPrimaryContent({ affiliation })}</div>
      <div>{renderSecondaryContent({ affiliation })}</div>
    </div>
  );
}
