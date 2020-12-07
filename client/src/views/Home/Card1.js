import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Princess_Mononoke_Japanese_poster.png/220px-Princess_Mononoke_Japanese_poster.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Princess Mononoke
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Princess Mononoke is a 1997 Japanese-animated epic fantasy film written and directed by Hayao Miyazaki.
          he story follows a young Emishi prince named Ashitaka, and his involvement in a struggle between the gods of a forest and the humans who consume its resources.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>

      
    </Card>

    
  );
}