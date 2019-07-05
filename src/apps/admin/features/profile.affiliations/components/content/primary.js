function renderAffiliationPrimaryContent({ affiliation }) {
  return `${affiliation.organization.name[0].payload}`;
}

export default renderAffiliationPrimaryContent;
