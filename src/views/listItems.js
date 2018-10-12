import React from 'react';
import PropTypes from 'prop-types'; 
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';

import PeopleIcon from '@material-ui/icons/People';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function mainListItems(props) {
  const { classes } = props;
  var authors = new Array();
  authors[0] = "author1";
  authors[1] = "author2";
  return (
    <div>
    <ExpansionPanel>
      
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <Typography className={classes.heading}>Author</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
         <List>
          {authors.map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              //onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
               // checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`${value}`} />
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
      
    </ExpansionPanel>
    
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  )
}
mainListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(mainListItems);

