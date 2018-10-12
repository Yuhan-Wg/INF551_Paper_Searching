import React from "react";

import Sidebar from "components/Sidebar/Sidebar.jsx";
import sidebarStyle from "assets/jss/paper-search/components/sidebarStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/usc.png";
import withStyles from "@material-ui/core/styles/withStyles";

import Person from "@material-ui/icons/Person";
const cateogryRoutes = [
    {
        path: "/upgrade-to-pro",
        sidebarName: "Author",
        navbarName: "Author",
        icon: Person,
        //component: DashboardPage
      }
];

class MySidebar extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <Sidebar
                classes = {classes.drawerPaper} 
                variant="permanent"
                routes={cateogryRoutes}
                logoText={"INF 551"}
                logo={logo}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                color="blue"
                {...rest}
            />
        );
    }
}
export default withStyles(sidebarStyle)(MySidebar);
