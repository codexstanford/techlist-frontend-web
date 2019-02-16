module.exports = {
  siteMetadata: {
    title: `CodeX LegalTech Index`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@Edelman215`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "TechList",
        // This is field under which it's accessible
        fieldName: "allTechList",
        // Url to query from
        url: "http://graphql.law.kitchen"

        // createSchema: async () => {
        //   const json = await JSON.parse(
        //     fs.readFileSync(`${__dirname}/schema.json`),
        //   )
        //   return buildClientSchema(json)
        // },
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {
          colors: {
            primary: "#b1040e",
            link: "#006CB8",
            hover: "#00548f"
          },
          typography: {
            useNextVariants: true
          },
          palette: {
            primary: {
              main: "#b1040e",
              contrastText: "#fff"
            },
            secondary: {
              main: "#04b1a8",
              contrastText: "#fff"
            }
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `config/typography`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
