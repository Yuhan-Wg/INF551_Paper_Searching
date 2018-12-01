import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Button from "components/CustomButtons/Button.jsx";

import PubSub from 'pubsub-js';
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    
    this.props = props;
    this.handleToggle = this.handleToggle.bind(this);
    this.authors = new Array();
    var strAuthors = ['Jeffrey Mervis','Elizabeth Pennisi','Adrian Cho',
    'Jon Cohen', 'Dennis Normile', 'Richard Stone',
    'Jocelyn Kaiser', 'Erik Stokstad', 'Kai Kupferschmidt'];
    var numbers = [51,43,37,36,30,28,27,27,23,23]
    for(var i=0; i<strAuthors.length;i++) {
      this.authors[i]= new Array();
      this.authors[i]['val'] = strAuthors[i];
      this.authors[i]['isSelect'] = false;
      this.authors[i]['type'] = "authors";
      this.authors[i]['number'] = numbers[i];
    }

    this.years = new Array();
    for(var i = 0; i<=10; i++) {
      this.years[i] = new Array();
      this.years[i]['val'] = 2008+i;
      this.years[i]['isSelect'] = false;
      this.years[i]['type'] = "years";
    }
    
    this.categories = new Array();
    var strCategories = ['News','None','Research Article','Other','Editorial','Book Review',
                          'Review Article','Article Commentary'];
    for(var i = 0; i<strCategories.length; i++) {
      this.categories[i] = new Array();
      this.categories[i]['val'] = strCategories[i];
      this.categories[i]['isSelect'] = false;
      this.categories[i]['type'] = "categories";
    }


    this.data = new Array();
    this.data['authors'] = this.authors;
    this.data['years'] = this.years;
    this.data['categories'] = this.categories;

    this.authorsSelect = new Array();
    this.anchors = new Array();
    this.state  = {
      authorPopover: false,
      yearPopover: false,
      anchors : this.anchors,
      data: this.data
    };
  }

  handleToggle(path){
    

  }

  handleCheckClick(obj) {
    obj['isSelect'] = !obj['isSelect'];
    this.setState(
      {
        'data' : this.data
      }
    )
    
  }

  handleOpenPopover(name) {
    var x = [];
    x[name+'Popover'] = true;
    this.setState(x);
  }

  handleFinishSelect(name) {
    PubSub.publish('get data', this.data);
    var x = [];
    x[name+'Popover'] = false;
    this.setState(x);
  }
  render() {
    const { classes, color, logo, image, logoText, routes } = this.props;
    var brand = (
      <div className={classes.logo}>
        <a className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </a>
      </div>
    );
    return (
      <div>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
              {routes.map((prop, key) => {
                if (prop.redirect) return null;
                var listItemClasses;
                listItemClasses = classNames({
                  [" " + classes[color]]: true
                });
                
                const whiteFontClasses = classNames({
                  [" " + classes.whiteFont]: true
                });
                return (
                  <div>
                    <ListItem 
                    buttonRef={node => {
                      this.anchors[prop.name] = node;
                    }}
                    button className={classes.itemLink + listItemClasses}
                    onClick={this.handleOpenPopover.bind(this,prop.name)}>
                      
                      <ListItemIcon className={classes.itemIcon + whiteFontClasses}
                      >
                        {typeof prop.icon === "string" ? (
                          <Icon>{prop.icon}</Icon>
                        ) : (
                          <prop.icon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={prop.path}
                        className={classes.itemText + whiteFontClasses}
                        disableTypography={true}
                      />
                    </ListItem>
                    <Popover
                        classes={{
                          paper: classes.popover
                        }}
                        open={this.state[prop.name+"Popover"]}
                        anchorEl={this.anchors[prop.name]}
                        anchorReference={"anchorEl"}
                        //onClose={}
                        //onClick = {this.handleChechClick.bind(this,prop.path)}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right"
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "left"
                        }}
                      >
                        <h3 className={classes.popoverHeader}>{prop.path}</h3>
                        <div className={classes.popoverBody}>
                        {this.data[prop.name].map((obj) => {
                          return (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  tabIndex={-1}
                                  onClick={() => this.handleCheckClick(obj)}
                                  checkedIcon={<Check className={classes.checkedIcon} />}
                                  icon={<Check className={classes.uncheckedIcon} />}
                                  classes={{ checked: classes.checked }}
                                  checked = {obj.isSelect}
                                />
                              }
                              classes={{ label: classes.label }}
                              label={typeof(obj.number) == "undefined"?obj.val: obj.val + '('+ obj.number +')'}
                            />
                          )
                          
                        })}
                        </div>
                        <Button color="primary" size="sm"
                        onClick = {() => this.handleFinishSelect(prop.name)}>
                            Finish
                        </Button>
                      </Popover>
                  </div>
                );
              })}
            </List>
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
