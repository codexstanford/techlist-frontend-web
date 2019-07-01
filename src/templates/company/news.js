import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import _ from 'lodash';

import { formatBingNewsPublishedDate } from './helpers';

export function CompanyNews({ classes, company, ...props }) {
  const [news, setNews] = useState(null);
  const qstring = company.name[0].payload;

  useEffect(() => {
    fetch(`${process.env.BING_SEARCH_NEWS_API}?q=${encodeURI(qstring)}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
      },
    })
      .then(data => data.json())
      .then(data => {
        if (data && data.value && data.value.length > 0) {
          setNews(data.value);
        }
        console.log('NO DATA?', data);
      })
      .catch(err => console.log(err));
  }, [company.name[0].payload]);

  if (!news) {
    return null;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h3" variant="h6">
          News
        </Typography>
        {renderNewsItems(news)}
      </CardContent>
    </Card>
  );
}

function renderNewsItems(news) {
  return _.reverse(_.sortBy(news, 'datePublished'))
    .slice(0, 5)
    .map((item, index) => {
      if (!item.name) {
        return null;
      }
      return (
        <ListItem key={`news-item-${index}`}>
          <ListItemText
            primary={
              <>
                <Link href={item.url} target="_blank">
                  {item.name}
                </Link>

                <Typography variant="caption">
                  {item.provider && item.provider.length > 0
                    ? item.provider[0].name
                    : null}{' '}
                  | {formatBingNewsPublishedDate(item.datePublished)}
                </Typography>
              </>
            }
            secondary={item.description || ''}
          />
        </ListItem>
      );
    });
}
