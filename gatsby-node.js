/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

require('dotenv').config({
  path: `.env${
    process.env.NODE_ENV === 'production' || process.env.LOCAL !== true
      ? '.production'
      : '.local'
  }`,
});

const path = require('path');
const slugify = require('slugify');
const fetch = require('node-fetch');
const _ = require('lodash');

const replacePath = path => (path === '/' ? path : path.replace(/\/$/, ''));

exports.onCreateWebpackConfig = ({ stage, actions, loaders, getConfig }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /aws-amplify/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const companyTemplate = path.resolve('src/templates/company.js');
  const tagTemplate = path.resolve('src/templates/tags.js');
  const profileTemplate = path.resolve('src/templates/profile.js');

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allTechList {
          organizationCategories(first: 10) {
            id
            payload
          }
          organizations(first: 10) {
            id
            name {
              id
              payload
            }
            logo {
              id
              payload
            }
            description
          }
          partyAccounts {
            id
            cognitoId
            createdAt
            name
            email
            phone
            phone_number_verified
            email_verified
            person {
              id
              name {
                id
                firstName
                lastName
                middleInitial
                suffix
                fromDate
                throughDate
              }
              email {
                id
                payload
                fromDate
                throughDate
              }
              avatar {
                id
                payload
                fromDate
                throughDate
              }
              metadata {
                isDraft
                isPublic
                isRejected
                isApproved
                isPendingReview
              }
              affiliation {
                id
                fromDate
                throughDate
                title
                role
                description
                organization {
                  id
                  name {
                    payload
                  }
                  logo {
                    payload
                  }
                }
              }
            }
          }
        }
      }
    `)
      .then(async result => {
        if (result.errors) {
          reject(result.errors);
        }

        const tags = result.data.allTechList.organizationCategories;

        result.data.allTechList.organizations.forEach(node => {
          if (node && node.name && node.name.length > 0) {
            createPage({
              path: `/companies/${slugify(node.name[0].payload)}/`,
              component: companyTemplate,
              context: {
                slug: slugify(node.name[0].payload),
                id: node.id,
                name: node.name[0].payload,
                url: 'https://fabulas.io',
                description: node.description,
                twitter: 'node.twitter',
                data: JSON.stringify({ ...node }),
              },
            });
          }
        });

        tags.forEach(tag => {
          if (tag.payload === '_-' || tag.payload === '----') {
            return;
          }
          createPage({
            path: `/tags/${_.kebabCase(tag.payload)}/`,
            component: tagTemplate,
            context: {
              tag: tag.payload,
              id: tag.id,
            },
          });
        });

        result.data.allTechList.partyAccounts.forEach(user => {
          if (user && user.person && user.person.name.length > 0) {
            createPage({
              path: `/profiles/${user.person.name[0].firstName.toLowerCase()}${user.person.name[0].lastName.toLowerCase()}/`,
              component: profileTemplate,
              context: {
                user: user,
              },
            });
          }
        });

        resolve();
      })
      .catch(err => console.log(err));
  });
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  return new Promise((resolve, rej) => {
    fetch(
      `https://api.cognitive.microsoft.com/bing/v7.0/news/search?q=legal+tech&freshness=Week&count=20&mkt=en-US`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.GATSBY_BING_API_KEY,
        },
      }
    )
      .then(data => data.json())
      .then(json => {
        const { value: articles } = json;

        articles.forEach((item, index) => {
          if (!item.image) {
            return;
          }
          const newsNode = {
            id: createNodeId(`news-${index}`),
            parent: null,
            children: [],
            internal: {
              type: 'News',
              contentDigest: createContentDigest(item),
              content: JSON.stringify(item),
            },
            slug: slugify(item.name),
            content: item.description,
            title: item.name,
            description: item.description,
            imageUrl: item.image.thumbnail.contentUrl.split('&')[0],
            link: item.url,
            pubDate: item.datePublished,
            sourceName: item.provider.name,
            author: item.provider.name,
          };
          createNode(newsNode);
        });
        resolve();
      });
  }).catch(err => console.log(err));
};
