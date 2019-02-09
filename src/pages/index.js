import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";

import SEO from "../components/seo";

const IndexPage = props => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {props.data.allSitePage.edges.map((edge, index) => {
      return (
        <div
          key={edge.node.path}
          style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}
        >
          <Link to={edge.node.path}>
            {edge.node.context ? edge.node.context.name : ""}
          </Link>
        </div>
      );
    })}

    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query HomePageQuery {
    allSitePage {
      edges {
        node {
          path
          jsonName
          context {
            name
          }
        }
      }
    }
  }
`;
