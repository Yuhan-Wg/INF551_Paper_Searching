import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import addNewUser from "./views/main";
import Layout from "./views/layout"
import MainPage from "./views/mainpage"

class Helloworld extends React.Component {
    handleChange(event) {
        var node = React.findDOMNode(this.refs.inputContent);
        node.innerHTML = event.target.value;

    }
    render(){
        return (
            <div>
                <Button onClick={addNewUser.writeUserData(1,'Jeff','@','url')} variant="contained" color="primary">
                    Hello World
                </Button>
                <input type="text" onChange={this.handleChange} />
                <span ref="inputContent"></span>
            </div>
        );
    }
}


ReactDOM.render(
    <MainPage/>,
    document.getElementById("app")
);