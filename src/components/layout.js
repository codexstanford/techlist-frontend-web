import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import CssBaseline from '@material-ui/core/CssBaseline'
import styled from 'styled-components'

import Header from './header/index'

const Layout = ({ children, ...rest }) => (
  <React.Fragment>
    <CssBaseline />
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <AppWrapper>
          <Header siteTitle={data.site.siteMetadata.title} {...rest} />

          <div
            style={{
              margin: `0 auto`,
              maxWidth: 1200,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0,

              height: '90vh',
            }}
          >
            <main>{children}</main>
            <footer />
          </div>
        </AppWrapper>
      )}
    />
  </React.Fragment>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const AppWrapper = styled.div`
  color: white;
`
