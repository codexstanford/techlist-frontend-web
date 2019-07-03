require('dotenv').config();
const theme = require('./theme');

module.exports = () => ({
  social: {
    twitter: 'https://twitter.com/codexstanford',
  },
  siteMetadata: {
    title: 'CodeX LegalTech Index',
    shortTitle: 'LegalTech Index',
    description:
      'Explore a curated list of 1129 companies changing the way legal is done',
    hostname: 'law.haus',
    protocol: 'https',
    url: 'https://law.haus',
  },
  api: {
    graphql: {
      endpoint: 'http://35.239.56.1/apollo',
      // endpoint: 'http://localhost:4000',
      typeName: 'TechList',
      fieldName: 'allTechList',
    },
  },
  theme,
});
