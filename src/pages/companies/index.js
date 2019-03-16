import React from 'react';
import { Link as GatsbyLink, graphql } from 'gatsby';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import 'react-table/react-table.css';
import DomainIcon from '@material-ui/icons/Domain';
import Layout from '../../components/layout';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import SEO from '../../components/seo';
import ListItemText from '@material-ui/core/ListItemText';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableFoot from '@material-ui/core/TableFooter';

import ReactTable, { useReactTable } from 'react-table';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const IndexPage = props => {
  const { classes } = props;
  const { row, root } = classes;

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={classes.root}>
        {/* <ReactTable
      data={props.data.allSitePage.edges}
      columns={[
        {
          Header: 'Name',
          accessor: edge => edge.node.context,
          id: edge => edge.node.context.name,
          Cell: props => (
            <TableRow>
              <TableCell>
                <Typography>{props.value.name}</Typography>
              </TableCell>
            </TableRow>
          ),
        },
      ]}
    >
      {(state, makeTable, instance) => {}}
    </ReactTable> */}

        <ReactTable
          columns={[
            {
              Header: 'Name',
              accessor: edge => edge.node.context,
              id: edge => edge.node.context.id,
              Cell: props => {
                return (
                  <ListItem
                    button
                    component={GatsbyLink}
                    to={`/companies/${
                      props.value && props.value.slug ? props.value.slug : ''
                    }`}
                    {...props}
                  >
                    <ListItemText
                      primary={
                        props.value && props.value.name ? props.value.name : ''
                      }
                    />
                  </ListItem>
                );
              },
            },
            // {
            //   Header: 'Target Markets',
            //   accessor: edge => edge.node.context,
            //   id: edge => edge.node.context.id,
            //   Cell: props => {
            //     const data = JSON.parse(props.value.data);
            //     console.log(data);

            //     if (data && data.targetMarkets.length > 0) {
            //       return (
            //         <ListItemText
            //           primary={data.targetMarkets.map(i => i.name).join(', ')}
            //         />
            //       );
            //     }

            //     return null;
            //   },
            // },
            // {
            //   Header: 'Business Models',
            //   accessor: edge => edge.node.context,
            //   id: edge => edge.node.context.id,
            //   Cell: props => {
            //     const data = JSON.parse(props.value.data);
            //     console.log(data);

            //     if (data && data.operatingModels.length > 0) {
            //       return (
            //         <ListItemText
            //           primary={data.operatingModels
            //             .map(i => i.name)
            //             .filter(n => n !== 'UNKNOWN')
            //             .join(', ')}
            //         />
            //       );
            //     }

            //     return null;
            //   },
            // },
            {
              Header: '',
              accessor: edge => edge.node.context,
              id: edge => edge.node.context.id,
              Cell: props => {
                return (
                  <ListItem
                    button
                    component={Link}
                    href={props.value && props.value.url ? props.value.url : ''}
                    {...props}
                  >
                    <DomainIcon />
                  </ListItem>
                );
              },
            },
          ]}
          getTdProps={() => {
            return {
              style: {
                color: '#333',
              },
            };
          }}
          getTrProps={() => {
            return {
              style: {
                width: '100%',
              },
            };
          }}
          data={props.data.allSitePage.edges}
        />

        {/* <div className={props.classes.root}>
          <List component="nav">
            {props.data.allSitePage.edges.slice(0, 10).map((edge, index) => {
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
              );
            })}
          </List>
        </div> */}
      </div>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
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
}))(IndexPage);

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
            slug
            url
            twitter
          }
        }
      }
    }
  }
`;
