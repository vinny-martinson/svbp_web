import React from 'react'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Request from 'superagent';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const Cards = (props) => {
    return(

        <div>
      <Card>
        <CardMedia
          image= {require ("./images/matcha.jpg")}
          title="{props.name}"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.name}
          </Typography>
          <Typography component="p">
           {props.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );


Cards.propTypes = {
  classes: PropTypes.object.isRequired,
}


}

export default Cards