import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import addNewUser from "./views/main";
import Layout from "./views/layout"
import MainPage from "./views/mainpage"

class Helloworld extends React.Component {
}


ReactDOM.render(
    <MainPage/>,
    document.getElementById("app")
);