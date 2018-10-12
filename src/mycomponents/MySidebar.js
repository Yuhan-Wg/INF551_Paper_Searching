import Sidebar from "components/Sidebar/Sidebar.jsx";
import React from "react";
import Person from "@material-ui/icons/Person"
import logo from "assets/img/usc.png"
import image from "assets/img/sidebar-2.jpg"
import Time from "@material-ui/icons/Timeline"
const categoryRoutes = [
    {
      path: "Authors",
      name: "author",
      navbarName: "author",
      icon: Person,
    },

    {
        path: "years",
        sidebarName: "author",
        navbarName: "author",
        icon: Time,
      }
      ,

    {
        path: "categories",
        sidebarName: "author",
        navbarName: "author",
        icon: Time,
      },
      {
        path: "publisher",
        sidebarName: "author",
        navbarName: "author",
        icon: Time,
      }
]

class MySidebar extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <Sidebar
                routes={categoryRoutes}
                logoText={"Creative Tim"}
                logo={logo}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                //open={this.state.mobileOpen}
                color="blue"
                {...rest}
            />
        )
    }
}
export default MySidebar;