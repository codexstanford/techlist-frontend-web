const Config = require('./config/site');
const config = Config();
global.fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
// const { HTTPLinkDataloader } = require('http-link-dataloader');
const getTemporaryAuthCreds = require('./config/buildAuth');
const jwt = getTemporaryAuthCreds();

module.exports = {
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    author: config.siteMetadata.author || '@edelman215',
    siteUrl: config.siteMetadata.url,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://013f689a9da7432abe19e566a90d3bfc@sentry.io/1427690',
        // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },

    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: config.api.graphql.typeName,
        fieldName: config.api.graphql.fieldName,

        createLink: pluginOptions => {
          return new Promise((res, rej) => {
            jwt.then(token => {
              console.log(
                `\n****************************************************`
              );
              console.log(
                `Connecting to => ${process.env.GATSBY_GRAPHQL_ENDPOINT}`
              );
              console.log(
                `****************************************************\n`
              );
              const client = createHttpLink({
                uri: config.api.graphql.endpoint,
                useGETForQueries: true,
                credentials: 'same-origin',
                fetchOptions: {
                  method: 'GET',
                },
                headers: {
                  authorization: `Bearer ${token.jwt}`,
                  Origin: 'http://localhost:8000',
                  'Content-Type': 'application/json',
                  'apollo-client-name': process.env.GATSBY_APPLICATION_NAME,
                  'apollo-client-version':
                    process.env.GATSBY_APPLICATION_VERSION,
                },
              });
              res(client);
            });
          });
        },
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        ...config.theme,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-force-trailing-slashes`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `codex-legaltech-index`,
        short_name: `techlist`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/sls-logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: config.siteMetadata.url,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'my-example-bucket',
        protocol: config.siteMetadata.protocol,
        hostname: config.siteMetadata.hostname,
      },
    },
    'gatsby-plugin-offline',
  ],
};
