const config = require('./config/site');

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
        url: config.api.graphql.endpoint,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `codex-legaltech-index`,
        short_name: `techlist`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
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
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        modifyUrlPrefix: {
          // If `pathPrefix` is configured by user, we should replace
          // the default prefix with `pathPrefix`.
          'http://': `https://`,
        },
      },
    },
  ],
};
