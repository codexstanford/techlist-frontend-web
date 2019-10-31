import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { navigate } from 'gatsby';
import slugify from 'slugify';
import styled from 'styled-components';

function renderAffiliationPrimaryContent({ affiliation }) {
  return (
    <Link
      onClick={() =>
        navigate(
          `/companies/${slugify(affiliation.organization.name[0].payload)}`
        )
      }
      target="_blank"
    >
      <CompanyName variant="subtitle2">
        {affiliation.organization.name[0].payload}
      </CompanyName>
    </Link>
  );
}

const CompanyName = styled(Typography)`
  font-weight: 500;
`;
export default renderAffiliationPrimaryContent;
