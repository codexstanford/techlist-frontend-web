/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const slugify = require("slugify");

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      techlist {
        companies {
          id
          name
          description
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }
    data.techlist.companies.forEach((company, index) => {
      const slug = slugify(company.name);
      console.log(slug);
      actions.createPage({
        path: `/co/${slug}${index}`,
        component: path.resolve(`./src/templates/company.js`),
        context: {
          id: company.id,
          slug,
          name: company.name
        }
      });
    });
  });
