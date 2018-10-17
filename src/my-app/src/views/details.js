import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    maxWidth: 800,
    width : 8000
    
  },
  media: {
    height: 400,
    width : 800
  },
};

function Details(props) {
    const { classes } = props;
    var detail = props.detail;
    return (
      <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={require('./test.jpg')}
          title="test"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {detail['title']}
          </Typography>
          <Typography component="p">
            {detail['description']}
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
  Details.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(Details);