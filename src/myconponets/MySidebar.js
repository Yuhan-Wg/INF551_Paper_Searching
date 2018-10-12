import React from "react";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import sidebarStyle from "assets/jss/paper-search/components/sidebarStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/usc.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
const cateogryRoutes = [];

class MySidebar extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <Sidebar
                classes = {classes.drawerPaper} 
                variant="permanent"
                routes={cateogryRoutes}
                logoText={"Yan Juefei"}
                logo={logo}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                color="blue"
                {...rest}
            >
                <ListItem button className={classes.itemLink + listItemClasses}>
                    <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                        <Icon>{prop.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary={"Author"}
                        className={classes.itemText + whiteFontClasses}
                        disableTypography={true}
                    />
                </ListItem>
            </Sidebar>
        );
    }
}
export default withStyles(sidebarStyle)(MySidebar);
