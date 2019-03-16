import React from 'react';
import PropTypes from 'prop-types';

// Utilities
import kebabCase from 'lodash/kebabCase';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ReactTable, { useReactTable } from 'react-table';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
// Components
import { Helmet } from 'react-helmet';
import { Link as GatsbyLink, graphql } from 'gatsby';
const slugify = require('slugify');
import _ from 'lodash';
import Link from '@material-ui/core/Link';

const Tags = ({ pageContext, data, classes, ...rest }) => {
  const { companyCategories } = data.allTechList;
  return (
    <Layout shouldShowSecondaryHeader={false} fullScreen={false}>
      <SEO
        title={`Company Categories `}
        keywords={[`gatsby`, `application`, `react`]}
      />
      <div className={classes.root}>
        <ReactTable
          columns={[
            {
              Header: 'Company Categories',
              accessor: edge => edge.name,
              id: edge => edge.id,
              Cell: props => {
                return (
                  <ListItem
                    button
                    component={GatsbyLink}
                    to={`/tags/${slugify(_.kebabCase(props.value))}/`}
                    {...props}
                  >
                    <ListItemText primary={props.value} />
                  </ListItem>
                );
              },
            },
          ]}
          data={companyCategories}
        />
      </div>
    </Layout>
  );
};

export default withStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '1rem',
    color: '#333',
  },
  row: {
    width: '100%',
  },
}))(Tags);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allTechList {
      companyCategories {
        id
        name
      }
    }
  }
`;
