import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../../components/layout'

import SEO from '../../components/seo'

const IndexPage = props => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {props.data.allSitePage.edges.map((edge, index) => {
      return (
        <div
          key={edge.node.path}
          style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}
        >
          <Link
            to={edge.node.path}
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {edge.node.context ? edge.node.context.name : ''}
          </Link>
        </div>
      )
    })}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    />

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    allSitePage {
      edges {
        node {
          path
          jsonName
          context {
            id
            name
          }
        }
      }
    }
  }
`
