require('dotenv').config({
  path: `.env${
    process.env.NODE_ENV === 'production' || process.env.LOCAL !== 'true'
      ? '.production'
      : '.local'
  }`,
});
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
      endpoint: process.env.GATSBY_GRAPHQL_ENDPOINT,
      typeName: 'TechList',
      fieldName: 'allTechList',
    },
  },
  theme,
});
