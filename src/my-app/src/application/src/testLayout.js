import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

import Details from "./details"

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
  bootstrapInput: {
    borderRadius: 20,
    backgroundColor: theme.palette.common.white,
    border: '2px solid #ced4da',
    fontSize: 14,
    padding: '10px 12px',
    width: '400px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});





const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Loctions'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

class MainLayout extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: 'Enter text',
    };
  }

  handleClick = () => {
    ReactDOM.render(
      <Details value={this.state.value}/>,
      document.getElementById("cardDetails")
    );
    this.setState({
      value:'',
    });
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
              University Of Southern California USC INF551
            </Typography>
            <Button color="primary" variant="outlined">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
          <Grid container spacing={40} alignItems="flex-start" justify="center">
            <Grid item>
              <TextField
                id="bootstrap-input"
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.bootstrapInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.bootstrapFormLabel,
                }}
                value={this.state.value}
                onChange={this.handleChange}
              />
              
            </Grid>
            
            <Grid item>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick.bind(this)}>
                  Search
                <SearchIcon className={classes.rightIcon}/>
              </Button>
            </Grid>
            
          </Grid>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40} alignItems="flex-start" justify="center">
            <Grid item>
              <CategoryPanel classes={classes}/>
            </Grid>
            <Grid item xs={8}>
                <div id="cardDetails">
                </div>
            </Grid>
          </Grid>
        </main>
        {/* Footer */}
        <footer className={classNames(classes.footer, classes.layout)}>
          <Grid container spacing={32} justify="space-evenly">
            {footers.map(footer => (
              <Grid item xs key={footer.title}>
                <Typography variant="title" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                {footer.description.map(item => (
                  <Typography key={item} variant="subheading" color="textSecondary">
                    {item}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

  
  function CategoryPanel(props) {
    const { classes } = props;
    return (
      <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Category 1</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <List>
                  {[0, 1, 2, 3].map(value => (
                  <ListItem
                      key={value}
                      role={undefined}
                      dense
                      button
                      onClick
                      className={classes.listItem}
                  >
                      <Checkbox
                          checked
                          tabIndex={-1}
                          disableRipple
                      />
                      <ListItemText primary={`Line item ${value + 1}`} />
                      <ListItemSecondaryAction>
                          <IconButton aria-label="Comments">
                              <CommentIcon />
                          </IconButton>
                      </ListItemSecondaryAction>
                  </ListItem>
                  ))}
              </List>
          </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
  CategoryPanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MainLayout);