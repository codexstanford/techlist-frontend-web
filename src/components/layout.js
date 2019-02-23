import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';

import Header from './header/index';

const Layout = ({ children, allSitePage, fullScreen = false, ...rest }) => (
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
          <Header
            allSitePage={allSitePage}
            siteTitle={data.site.siteMetadata.title}
            fullScreen={fullScreen}
            {...rest}
          />

          {fullScreen ? (
            <FSMainWrapper>{children}</FSMainWrapper>
          ) : (
            <MainWrapper style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
              {children}
            </MainWrapper>
          )}

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
const MainWrapper = styled.main`
  max-width: 1250px;
  margin: 0 auto;
`;
const FSMainWrapper = styled.main``;
