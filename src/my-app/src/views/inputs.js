import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import ReactDOM from "react-dom";
import Details from "./details"
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

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
  }
});

function InputWithIcon(props) {
  const { classes } = props;

  function handleClick() {
    var detail = {};
    detail['title'] = "to test title a";
    detail['description'] = "to test contentto test contentto test contentto test contentto test content";
    ReactDOM.render(
      <Details detail={detail}/>,
      document.getElementById("cardDetails")
    );
  };

  return (
    <div className={classes.container}>
        <TextField
          id="outlined-full-width"
          label="Yan Juefei"
          style={{ margin: 8 }}
          placeholder="Title"
          helperText="Enter name"
          margin="normal"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        
      
      <Button variant="contained" color="primary" className={classes.button} 
        onClick={handleClick.bind(this)}
        >
          Search
        <SearchIcon className={classes.rightIcon}/>
      </Button>
    </div>
  );
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);