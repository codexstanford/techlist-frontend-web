const url = require('url');
const mURL = new URL('https://law.haus');
const theme = require('./theme');

module.exports = {
  social: {
    twitter: 'https://twitter.com/codexstanford',
  },
  siteMetadata: {
    title: 'CodeX LegalTech Index',
    shortTitle: 'LegalTech Index',
    description: '',
    hostname: mURL.hostname,
    protocol: mURL.protocol.slice(0, -1),
    url: mURL.href.slice(0, -1),
  },
  api: {
    graphql: {
      endpoint: 'http://graphql.law.kitchen',
      typeName: 'TechList',
      fieldName: 'allTechList',
    },
  },
  theme,
};
