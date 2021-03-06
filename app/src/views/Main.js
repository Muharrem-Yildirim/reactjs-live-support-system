import React, { Component } from "react";
import "../assets/main.scss";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { withChatContext } from "../ChatContext";

import Button from "@material-ui/core/Button";

import locale from "../locales/main";



class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /* INPUTS */
      fullName: "",
      email: "",
      message: "",
    };
  }

  startChat = (e) => {
    this.props.dispatch({
      type: "MESSAGE_BOX",
      payload: {
        messageBox: { title: locale.connecting, message: locale.please_wait },
      },
    });

    this.props.chatClient
      .startChat({
        fullName: this.state.fullName,
        email: this.state.email,
        message: this.state.message,
      })
      .then((isConnected) => {
        if (isConnected) this.props.history.push("/chat");
      });
  };

  onInputChange = (e) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      },
      () => {
        // console.log(e.target.name, this.state[e.target.name]);
      }
    );
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <h1 className="">{locale.welcome}</h1>
          <h4 className="">{locale.welcome_info}</h4>
          <form className="form">
            <TextField
              label={locale.name}
              placeholder={locale.please_enter_name}
              // helperText="error"
              fullWidth
              margin="normal"
              variant="filled"
              name="fullName"
              onChange={this.onInputChange}
            />
            <TextField
              label={locale.mail}
              placeholder={locale.please_enter_mail}
              variant="filled"
              fullWidth
              name="email"
              onChange={this.onInputChange}
            />
            <TextField
              label={locale.message}
              placeholder={locale.please_enter_message}
              fullWidth
              variant="filled"
              margin="normal"
              multiline
              rows={5}
              name="message"
              onChange={this.onInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              className="start-chat-btn"
              onClick={this.startChat}
            >
              {locale.start_chat}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messageBox: state.messageBox,
  };
};

export default withChatContext(connect(mapStateToProps)(Main));
