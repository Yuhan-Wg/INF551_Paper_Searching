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
class Sidebar extends React.Component {
  anchor = null;
  constructor(props) {
    super(props);
    
    this.props = props;
    this.handleToggle = this.handleToggle.bind(this);
    this.authors = new Array();
    this.authors[0] = new Array();
    this.authors[0]['name'] = 'name0';
    this.authors[0]['isSelect'] = true;

    this.authors[1] = new Array();
    this.authors[1]['name'] = 'name1';
    this.authors[1]['isSelect'] = false;

    this.authors[2] = new Array();
    this.authors[2]['name'] = 'name2';
    this.authors[2]['isSelect'] = false;

    this.data = new Array();
    this.data['authors'] = this.authors;

    this.authorsSelect = new Array();
    this.state  = {
      authorPopover: false,
      yearPopover: false,
      authorsSelect:this.authorsSelect
    };
  }

  handleToggle(path){
    

  }

  handleCheckClick(obj) {
    this.state.authorsSelect[obj.name] = !this.state.authorsSelect[obj.name];

    this.setState(
      {
        'authorsSelect' : this.state.authorsSelect
      }
    )
  }

  handleOpenPopover(name) {
    var x = [];
    x[name+'Popover'] = true;
    this.setState(x);
  }

  handleFinishSelect(name) {
    var x = [];
    x[name+'Popover'] = false;
    this.setState(x);
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return true;
  };
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
                var activePro = " ";
                var listItemClasses;
                listItemClasses = classNames({
                  [" " + classes[color]]: this.activeRoute(prop.path)
                });
                
                const whiteFontClasses = classNames({
                  [" " + classes.whiteFont]: this.activeRoute(prop.path)
                });
                return (
                  <div>
                    <ListItem 
                    buttonRef={node => {
                      this.anchor = node;
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
                        anchorEl={this.anchor}
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
                        {this.data['authors'].map((obj) => {
                          return (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  tabIndex={-1}
                                  onClick={() => this.handleCheckClick(obj)}
                                  checkedIcon={<Check className={classes.checkedIcon} />}
                                  icon={<Check className={classes.uncheckedIcon} />}
                                  classes={{ checked: classes.checked }}
                                  checked = {this.state.authorsSelect[obj.name]}
                                />
                              }
                              classes={{ label: classes.label }}
                              label={obj.name}
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
