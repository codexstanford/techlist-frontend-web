function renderCompanyPrimaryContent({ company }) {
  return `${company.name[0].payload}`;
}

export default renderCompanyPrimaryContent;
