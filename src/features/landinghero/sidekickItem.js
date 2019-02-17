import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

export function SidekickItem(props) {
  const { classes, title, date, content, imageUrl, id } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.cardMedia}
          height="140"
          image={imageUrl}
        />
      </CardActionArea>

      <CardContent>
        <Typography component="h2" variant="subtitle2">
          {title}
        </Typography>

        <Typography variant="body2">
          {content
            .replace(/<[^>]*>/, ' ')
            .split(' ')
            .slice(0, 50)
            .join(' ')}
        </Typography>
      </CardContent>
      <CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default SidekickItem;
