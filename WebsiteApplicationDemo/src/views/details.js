import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { runInThisContext } from 'vm';

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

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.classes  = props;
    this.details = props.details;
    this.tmpDetail = {text: ""};

    this.state = {
      value: 'Enter text',
      open:false,
      tmpDetail: this.tmpDetail
    };

  }
  handleClickOpen = (e,i) => {
    this.tmpDetail = this.details[i];
    console.log(this.tmpDetail)
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    this.details = this.props.details;
    console.log(this.details);
    return (
      <div>
        {this.details.map((detail, i)=> (
          <div>
            <Card className={this.classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {detail['title']}
                  </Typography>
                  <Typography component="h4">
                    {detail['type']}
                  </Typography>
                  <Typography component="h4">
                    {detail['date']}
                  </Typography>
                  <Typography component="p">
                    {"authors: " + detail['author']}
                  </Typography>
                  <Typography component="p">
                    {"publisher: " + detail['publisher']}
                  </Typography>
                  <Typography component="p">
                    {"DOI: " + detail['doi']}
                  </Typography>
                  <Typography component="p">
                    {"abstract: " + detail['abstract']}
                  </Typography>
                  
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <a href={detail['pdfLink']} download="test.pdf">DownLoad</a>
                </Button>
                <Button size="small" color="primary" onClick={(e) => this.handleClickOpen(e,i)}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
            <br></br>
          </div>
        ))}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.tmpDetail['title']}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.tmpDetail['text']}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              close
            </Button>
          </DialogActions>
        </Dialog>

      </div>
      
     

    )
  }
}



Details.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Details);
// export default withStyles(sidebarStyle)(Sidebar);