import {
    drawerWidth,
    transition,
    boxShadow,
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor
} from "assets/jss/material-dashboard-react.jsx";

const sidebarStyle = theme => ({
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        ...defaultFont
      },
      itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(255, 255, 255, 0.8)"
      },
      itemText: {
        ...defaultFont,
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: "#FFFFFF"
      }
});

export default sidebarStyle;