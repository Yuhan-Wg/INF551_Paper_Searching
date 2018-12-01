import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import ReactDOM from "react-dom";
import Details from "./details"
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import paperSearch from '../search-functions/search'
import PubSub from 'pubsub-js';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
    //flexWrap: 'wrap',
    width: 400
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class InputWithIcon extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      logic1: 'or',
      logic3: 'or',
      labelWidth: 0,
    };
    this.props  = props;
    this.classes = props;
    this.data = {};
    this.content = "";
    PubSub.subscribe('get data', 
    (msg, data)=> {
      this.data = data;
      // console.log(msg);
      // console.log(data);
    });
  }

  handleChange = event => {
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick() {

    var limit = new Array();
    limit['year'] = [];
    limit['catesearch'] = [];
    limit['author'] = [];
    if(this.data['years']) {
      for(var i=0; i<this.data['years'].length; i++) {
        var tmpYear = this.data['years'][i].val;
        if(this.data['years'][i].isSelect) {
          limit['year'].push(tmpYear);
        }
      }
    }
    
    if(this.data['categories']) {
      for(var i=0; i<this.data['categories'].length; i++) {
        var type = this.data['categories'][i].val;
        if(this.data['categories'][i].isSelect) {
          limit['catesearch'].push(type.toLowerCase().replace(/\s+/g,""));
        }
      }
    }

    if(this.data['authors']) {
      for(var i=0; i<this.data['authors'].length; i++) {
        var tmpAuthor = this.data['authors'][i].val;
        if(this.data['authors'][i].isSelect) {
          limit['author'].push(tmpAuthor.toLowerCase());
        }
      }
    }

    if(limit['year'].length === 0) delete limit.year;
    if(limit['catesearch'].length === 0) delete limit.catesearch;
    if(limit['author'].length === 0) delete limit.author;

    if(typeof(limit['year']) === "undefined" 
    && typeof(limit['catesearch']) === "undefined"
    && typeof(limit['author']) === "undefined") 
      limit = null;
    console.log(limit);
    paperSearch(this.content.value ,limit, this.state.logic1,"or",this.state.logic3).then ( (details) =>{
        ReactDOM.render(
          <Details details={details}/>,
          document.getElementById("cardDetails")
        )

      }
      
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={this.classes.container}>
          <TextField
            id="outlined-full-width"
            label="INF551"
            style={{ margin: 8 }}
            placeholder="Title"
            helperText="Enter name"
            margin="normal"
            variant="outlined"
            fullWidth
            inputRef={input => (this.content = input)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
        
        <Button variant="contained" color="primary" className={this.classes.button} 
          onClick={this.handleClick.bind(this)}
          >
            Search
          <SearchIcon className={this.classes.rightIcon}/>
        </Button>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Key Word</InputLabel>
            <Select
              value={this.state.logic1}
              onChange={this.handleChange}
              inputProps={{
                name: 'logic1',
                id: 'logic1',
              }}
            >
              <MenuItem value={"or"}>or</MenuItem>
              <MenuItem value={"and"}>and</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">limitation</InputLabel>
            <Select
              value={this.state.logic3}
              onChange={this.handleChange}
              inputProps={{
                name: 'logic3',
                id: 'logic3',
              }}
            >
              <MenuItem value={"or"}>or</MenuItem>
              <MenuItem value={"and"}>and</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    );

  };
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);