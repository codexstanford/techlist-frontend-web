import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

export default props => {
  const { company } = props.data.allTechList;

  return (
    <Layout>
      <div>
        <h1>{company.name}</h1>
        <p>{unescape(company.description)}</p>
        {company.twitter && <a href={`${company.twitter}`}>Twitter</a>}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Company($id: ID) {
    allTechList {
      company(where: { id: $id }) {
        name
        description
        location
        url
        twitter
        crunchbase
        angellist
      }
    }
  }
`;
