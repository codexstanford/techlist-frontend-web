import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ReactTable from 'react-table';
import { Link as GatsbyLink, graphql } from 'gatsby';
const slugify = require('slugify');
import Typography from '@material-ui/core/Typography';
import 'react-table/react-table.css';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const Tags = ({ pageContext, data, classes, ...rest }) => {
  const { organizations } = data.allTechList.organizationCategory;
  return (
    <Layout shouldShowSecondaryHeader={false} fullScreen={false}>
      <SEO
        title={`Category | ${data.allTechList.organizationCategory.payload}`}
        keywords={[`gatsby`, `application`, `react`]}
      />
      <div className={classes.root}>
        <ReactTable
          className="-striped -highlight"
          defaultSorted={[
            {
              id: 'name',
              desc: false,
            },
          ]}
          filterable
          defaultFilterMethod={(filter, row) => {
            if (
              row[filter.id].name.payload === undefined ||
              row[filter.id].name.payload === null
            ) {
              return false;
            }
            return row[filter.id].name.payload
              .split(' ')
              .includes(filter.value);
          }}
          resolveData={data => {
            return data
              .filter(item => item.name.payload !== null)
              .map(item => ({
                name: item.name,
                id: item.id,
                slug: item.slug,
                description: item.description,
              }))
              .map(item => {
                // console.log(item);
                return item;
              });
          }}
          columns={[
            {
              Header: () => (
                <Typography variant="h6">
                  {toTitleCase(
                    data.allTechList.organizationCategory.payload
                      .split('_')
                      .join(' ')
                  )}
                </Typography>
              ),
              accessor: edge => edge,
              id: edge => edge.id,
              Cell: props => {
                return (
                  <ListItem
                    button
                    component={GatsbyLink}
                    to={`/companies/${slugify(props.value.name[0].payload)}/`}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1">
                          {props.value && props.value.name[0].payload
                            ? props.value.name[0].payload
                            : ''}
                        </Typography>
                      }
                      secondary={
                        props.value && props.value.description ? (
                          <>
                            <Typography
                              component="span"
                              variant="caption"
                              className={classes.inline}
                            >
                              {props.value.description.split(' ').length <= 7
                                ? props.value.description
                                : props.value.description
                                    .split(' ')
                                    .slice(0, 7)
                                    .join(' ') + ' ...'}
                            </Typography>
                          </>
                        ) : (
                          ''
                        )
                      }
                    />
                  </ListItem>
                );
              },
            },
          ]}
          data={organizations}
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
  query CompanyCategory($id: ID!) {
    allTechList {
      organizationCategory(where: { id: $id }) {
        id
        payload
        organizations {
          id
          description
          name {
            payload
          }
        }
      }
    }
  }
`;
