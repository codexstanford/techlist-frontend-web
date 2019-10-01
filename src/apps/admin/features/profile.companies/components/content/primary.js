import React from 'react';
import Link from '@material-ui/core/Link';
import { navigate } from 'gatsby';
import slugify from 'slugify';

function renderCompanyPrimaryContent({ classes, company }) {
  return (
    <Link
      onClick={() => navigate(`/companies/${slugify(company.name[0].payload)}`)}
      target="_blank"
    >
      {company.name[0].payload}
    </Link>
  );
}

export default renderCompanyPrimaryContent;
