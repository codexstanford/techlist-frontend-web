import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/layout';
import SEO from '../components/seo';

const slugify = require('slugify');
import ReactTable, { useReactTable } from 'react-table';
// Components
import { Link as GatsbyLink, graphql } from 'gatsby';
import Link from '@material-ui/core/Link';

const Tags = ({ pageContext, data, classes, ...rest }) => {
  console.log(pageContext, data, rest);
  const { companies } = data.allTechList.companyCategory;

  return (
    <Layout shouldShowSecondaryHeader={false} fullScreen={false}>
      <SEO
        title={`Category | ${data.allTechList.companyCategory.name}`}
        keywords={[`gatsby`, `application`, `react`]}
      />
      <div className={classes.root}>
        <ReactTable
          columns={[
            {
              Header: 'Name',
              accessor: edge => edge.name,
              id: edge => edge.id,
              Cell: props => {
                return (
                  <ListItem
                    button
                    component={GatsbyLink}
                    to={`/companies/${slugify(props.value)}/`}
                    {...props}
                  >
                    <ListItemText primary={props.value} />
                  </ListItem>
                );
              },
            },
          ]}
          data={companies}
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
  query CompanyCategory($tag: String) {
    allTechList {
      companyCategory(where: { name: $tag }) {
        id
        name
        companies {
          id
          name
          location {
            formatted_address
            googleId
            id
            photos
          }
          url
          twitter
          crunchbase
          angellist
        }
      }
    }
  }
`;
