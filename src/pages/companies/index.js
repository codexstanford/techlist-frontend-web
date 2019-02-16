import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import Link from '@material-ui/core/Link'

import Layout from '../../components/layout'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import SEO from '../../components/seo'
import ListItemText from '@material-ui/core/ListItemText'

const IndexPage = props => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className={props.classes.root}>
      <List component="nav">
        {props.data.allSitePage.edges.map((edge, index) => {
          return (
            <ListItem
              button
              key={edge.node.path}
              style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}
            >
              <Link
                component={GatsbyLink}
                to={edge.node.path}
                style={{
                  textDecoration: `none`,
                }}
              >
                <ListItemText
                  primary={edge.node.context ? edge.node.context.name : ''}
                />
              </Link>
            </ListItem>
          )
        })}
      </List>
    </div>

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

export default withStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))(IndexPage)

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
