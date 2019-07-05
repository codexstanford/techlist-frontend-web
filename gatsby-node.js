/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require('dotenv').config();
const path = require('path');
const slugify = require('slugify');
const crypto = require('crypto');
const fetch = require('node-fetch');
const _ = require('lodash');

const replacePath = path => (path === '/' ? path : path.replace(/\/$/, ''));

exports.onCreateWebpackConfig = ({ stage, actions, loaders, getConfig }) => {
  const config = getConfig();

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
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allTechList {
          organizations {
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
        }
      }
    `)
      .then(async result => {
        if (result.errors) {
          reject(result.errors);
        }

        const newRes = await graphql(`
          {
            allTechList {
              organizationCategories {
                id
                payload
              }
            }
          }
        `);

        const tags = newRes.data.allTechList.organizationCategories;

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

        // result.data.allTechList.companies.forEach(node => {
        //   createPage({
        //     path: `/companies/${slugify(node.name)}/`,
        //     component: companyTemplate,
        //     context: {
        //       slug: slugify(node.name),
        //       id: node.id,
        //       name: node.name,
        //       url: node.url,
        //       description: node.description,
        //       twitter: node.twitter,
        //       data: JSON.stringify({ ...node }),
        //     },
        //   });
        // });

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
          'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
        },
      }
    )
      .then(data => data.json())
      .then(json => {
        const { value: articles } = json;
        console.log(articles.length);
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
            imageUrl: item.image.thumbnail.contentUrl,
            link: item.url,
            pubDate: item.datePublished,
            sourceName: item.provider.name,
            author: item.provider.name,
          };
          createNode(newsNode);
        });
        resolve();
      });
  });
};

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;

//   // page.matchPath is a special key that's used for matching pages
//   // only on the client.
//   if (page.path.match(/^\/app/)) {
//     page.matchPath = `/app/*`;

//     // Update the page.
//     createPage(page);
//   }
// };
