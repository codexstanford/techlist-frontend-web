import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ReactTable from 'react-table';
import { Link as GatsbyLink, graphql } from 'gatsby';
const slugify = require('slugify');

const Tags = ({ pageContext, data, classes, ...rest }) => {
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
