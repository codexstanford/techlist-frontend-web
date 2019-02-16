/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const slugify = require("slugify");
const crypto = require("crypto");

const replacePath = path => (path === "/" ? path : path.replace(/\/$/, ""));

// const { createApolloFetch } = require("apollo-fetch");

// const fetch = createApolloFetch({
//   uri: "http://graphql.law.kitchen"
// });

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions;
  // Transform the new node here and create a new node or
  // create a new node field.

  console.log(node.internal);
  if (node.internal.typeName === "TechList") {
    console.log(node);
  }
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
  const companyTemplate = path.resolve("src/templates/company.js");

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
          path: `/co/${slugify(node.name)}`,
          component: companyTemplate,
          context: {
            slug: slugify(node.name),
            id: node.id,
            name: node.name
          }
        });
      });
      resolve();
    });
  });
};

// exports.createPages = ({ actions, graphql }) =>
//   graphql(`
//     query {

//     }
//   `).then(({ data, errors }) => {
//     if (errors) {
//       return Promise.reject(errors);
//     }
//     data.allTechList.companies.forEach((company, index) => {
//       const companyNode = {
//         id: createNodeId(`company-${company.id}`),
//         parent: null,
//         children: [],
//         internal: {
//           type: "TechListCompany",
//           contentDigest: createContentDigest(company),
//           content: JSON.stringify(company)
//         },
//         slug: slugify(company.name),
//         ...company
//       };
//       createPage(companyNode);
//     });
//   });

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;
//   if (page.path.match(/^\/dashboard/)) {
//     page.matchPath = "/dashboard/*";
//     createPage(page);
//   }
// };

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//   const companyTemplate = path.resolve("src/templates/company.js");

//   return new Promise((resolve, reject) => {
//     resolve(
//       graphql(`
//         {
//           allCompany {
//             edges {
//               node {
//                 slug
//               }
//             }
//           }
//         }
//       `)
//     );
//   }).then(result => {
//     if (result.errors) {
//       console.log(result.errors);
//     }

//     result.data.allCompany.edges.forEach(({ node }) => {
//       createPage({
//         path: `/company/${node.slug}`,
//         component: companyTemplate,
//         context: {
//           slug: `${node.slug}`
//         }
//       });
//     });
//   });
// };
