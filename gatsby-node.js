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

const replacePath = path => (path === '/' ? path : path.replace(/\/$/, ''));

// const { createApolloFetch } = require("apollo-fetch");

// const fetch = createApolloFetch({
//   uri: "http://graphql.law.kitchen"
// });

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions;
  // Transform the new node here and create a new node or
  // create a new node field.

  // console.log(node.internal)
  // if (node.internal.typeName === 'TechList') {
  //   console.log(node)
  // }
};

// exports.sourceNodes = async ({
//   actions,
//   graphql,
//   createNodeId,
//   createContentDigest
// }) => {
//   console.log(graphql);
//   const { createNode } = actions;
//   return new Promise((resolve, reject) => {
//     fetch({
//       query: `

//         `
//     })
//       .then(res => {
//         const { data } = res;
//         data.companies.forEach((company, index) => {
//           const companyNode = {
//             id: createNodeId(company.id),
//             parent: null,
//             children: [],
//             internal: {
//               type: "Company",
//               contentDigest: createContentDigest(company),
//               content: JSON.stringify(company),
//               description: "Data from Stanford's Legal Tech Index"
//             },
//             slug: slugify(company.name),
//             ...company
//           };
//           createNode(companyNode);
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     resolve();
//   });
// };

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const companyTemplate = path.resolve('src/templates/company.js');

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allTechList {
          companies {
            id
            name
            operatingModels
            yearFounded
            description
            visible
            targetMarkets
            cats
            url
            twitter
            crunchbase
            angellist
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      result.data.allTechList.companies.forEach(node => {
        createPage({
          path: `/companies/${slugify(node.name)}/`,
          component: companyTemplate,
          context: {
            slug: slugify(node.name),
            id: node.id,
            name: node.name,
          },
        });
      });
      resolve();
    });
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
      'https://newsapi.org/v2/everything?q=LegalTech&language=en&sortBy=popularity&from=2019-02-08&apiKey=a51190f100bc46a4aba4495c562b1cf9'
    )
      .then(res => res.json())
      .then(json => {
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
