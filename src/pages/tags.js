import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ReactTable from 'react-table';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Link as GatsbyLink, graphql } from 'gatsby';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import 'react-table/react-table.css';

const slugify = require('slugify');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

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
          className="-striped -highlight"
          resolveData={data => {
            return data
              .filter(item => item.name !== '----' && item.name !== '_-')
              .map(item => {
                const { name, id } = item;
                const formattedName = toTitleCase(name.split('_').join(' '));
                return {
                  id,
                  name: formattedName,
                };
              });
          }}
          defaultSorted={[
            {
              id: 'Categories',
              desc: false,
            },
          ]}
          columns={[
            {
              Header: () => <Typography variant="h6">Categories</Typography>,
              accessor: edge => edge.name,
              id: edge => edge.id,
              Cell: props => {
                return (
                  <ListItem
                    button
                    component={GatsbyLink}
                    to={`/tags/${slugify(_.kebabCase(props.value))}/`}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {props.value ? props.value : ''}
                        </Typography>
                      }
                    />
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
