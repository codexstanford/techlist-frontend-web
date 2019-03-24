/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const slugify = require('slugify');
const crypto = require('crypto');
const fetch = require('node-fetch');
const _ = require('lodash');

const replacePath = path => (path === '/' ? path : path.replace(/\/$/, ''));

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.onCreateNode = ({ node, actions }) => {};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const companyTemplate = path.resolve('src/templates/company.js');
  const tagTemplate = path.resolve('src/templates/tags.js');

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allTechList {
          companies {
            id
            name
            location {
              formatted_address
              googleId
              id
              photos
            }
            operatingModels {
              name
              id
            }
            yearFounded
            description
            visible
            targetMarkets {
              name
              id
            }
            cats {
              name
              id
            }
            url
            twitter
            crunchbase
            angellist
          }
          companyCategories {
            id
            name
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const tags = result.data.allTechList.companyCategories;

        result.data.allTechList.companies.forEach(node => {
          createPage({
            path: `/companies/${slugify(node.name)}/`,
            component: companyTemplate,
            context: {
              slug: slugify(node.name),
              id: node.id,
              name: node.name,
              url: node.url,
              twitter: node.twitter,
              data: JSON.stringify({ ...node }),
            },
          });
        });

        tags.forEach(tag => {
          console.log(tag);
          if (tag.name === '_-' || tag.name === '----') {
            return;
          }
          createPage({
            path: `/tags/${_.kebabCase(tag.name)}/`,
            component: tagTemplate,
            context: {
              tag: tag.name,
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
      'https://newsapi.org/v2/everything?q=LegalTech&language=en&sortBy=popularity&from=2019-02-25&apiKey=a51190f100bc46a4aba4495c562b1cf9'
    )
      .then(res => res.json())
      .then(json => {
        if (!json.articles) {
          throw new Error('SOMETHING IS WRONG WITH NEWS API: ', json);
          rej();
        }
        json.articles.forEach((item, index) => {
          const newsNode = {
            id: createNodeId(`news-${index}`),
            parent: null,
            children: [],
            internal: {
              type: 'News',
              contentDigest: createContentDigest(item),
              content: JSON.stringify(item),
            },
            slug: slugify(item.title),
            author: item.author,
            sourceId: item.source.id,
            sourceName: item.source.name,
            imageUrl: item.urlToImage,
            content: item.content,
            title: item.title,
            description: item.description,
            pubDate: item.publishedAt,
            webMaster: item.webMaster,
            link: item.url,
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
