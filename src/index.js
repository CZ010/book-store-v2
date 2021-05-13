import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {IconButton, StylesProvider} from "@material-ui/core";
import {SnackbarProvider} from "notistack";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {DataProvider} from "./Context/DataContext";

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <StylesProvider injectFirst>
    <SnackbarProvider
      ref={notistackRef}
      action={(key) => (
        <IconButton style={{color: "#fff"}} onClick={onClickDismiss(key)}>
          <HighlightOffIcon/>
        </IconButton>
      )}
    >
      <DataProvider>
        <App/>
      </DataProvider>
    </SnackbarProvider>
  </StylesProvider>,
  document.getElementById("root")
);


