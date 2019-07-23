export function getInitialValues(initialCompany) {
  return {
    AffiliationCompany: initialCompany ? initialCompany.name[0].payload : '',
  };
}
