import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

export function SidekickItem(props) {
  const { classes, title, date, content, imageUrl, id } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.cardMedia}
          alt={title
            .split(' ')
            .slice(0, 5)
            .join(' ')}
          height="140"
          image={imageUrl}
        />
      </CardActionArea>

      <CardContent>
        <Typography component="h2" variant="subtitle2">
          {title
            .split(' ')
            .slice(0, 6)
            .join(' ')}
        </Typography>

        <Typography variant="body2">
          {content &&
            content
              .replace(/<[^>]*>/, ' ')
              .split(' ')
              .slice(0, 50)
              .join(' ')}
        </Typography>
      </CardContent>
      <CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            aria-label="Read Full Story"
            href={props.link}
          >
            Read Full Story
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default SidekickItem;
