import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';

import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Details from "./details"
import ListItems from './listItems';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Parallax from "../components/Parallax/Parallax.jsx";
const drawerWidth = 240;

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbarTitle: {
    flex: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  layout: {
    // width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    // [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
    //   width: 900,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
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
      open:true
    };
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    var detail = {};
    detail['title'] = "to test title                   a";
    detail['description'] = "to test contentto test contentto test contentto test contentto test content";
    ReactDOM.render(
      <Details detail={detail}/>,
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
        <Parallax small filter image={require("../assets/img/bg.jpg")} />
        <div className={classes.root}>
          <AppBar position="absolute"
              className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden,
                  )}
                >
                  <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
                University Of Southern California USC INF551
              </Typography>
              <Button color="primary" variant="outlined">
                Login
              </Button>
            </Toolbar>
          </AppBar>

          <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List><ListItems/></List>
              <Divider />
              <List>
                <secondList/>
              </List>
          </Drawer>
        
        

          <main className={classes.layout}>
            {/* Hero unit */}
            <div className={classes.appBarSpacer} />
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
              <Grid item xs={8}>
                  <div id="cardDetails">
                  </div>
              </Grid>
            </Grid>
          </main>
          
        </div>
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


MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);