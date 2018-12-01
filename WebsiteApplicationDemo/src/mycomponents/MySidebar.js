import Sidebar from "components/Sidebar/Sidebar.jsx";
import React from "react";
import Person from "@material-ui/icons/Person"
import logo from "assets/img/usc.png"
import image from "assets/img/sidebar-2.jpg"
import Time from "@material-ui/icons/Timeline"
import Category from "@material-ui/icons/Category"
const categoryRoutes = [
    {
      path: "Authors",
      name: "authors",
      navbarName: "author",
      icon: Person,
    },

    {
        path: "Years",
        name: "years",
        navbarName: "author",
        icon: Time,
      }
      ,

    {
        path: "Categories",
        name: "categories",
        navbarName: "author",
        icon: Category,
    }
]

class MySidebar extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <Sidebar
                routes={categoryRoutes}
                logoText={"Filter"}
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