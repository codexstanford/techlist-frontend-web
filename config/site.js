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
      endpoint:
        'http://a8293f4b6428611e991a6062672a2ea4-1472358435.us-west-2.elb.amazonaws.com',
      typeName: 'TechList',
      fieldName: 'allTechList',
    },
  },
  theme,
});
