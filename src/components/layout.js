import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';

import Header from './header/index';

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

          <main style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            {children}
          </main>
          <footer />
        </AppWrapper>
      )}
    />
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const AppWrapper = styled.div`
  color: white;
`;
