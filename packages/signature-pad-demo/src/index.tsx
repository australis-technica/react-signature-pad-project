import * as React from "react";
import * as ReactDOM from "react-dom";
import app from "./app";
import { Provider as StoreProvider, connect } from "react-redux";
import "./index.css";
import store from "./store";
import appStore from "./app-store"
localStorage.setItem("DEBUG", "*");
/** */
const App =connect((state, props)=> ({...appStore.selector(state), ...props}))(app);
/** */
ReactDOM.render(
  <StoreProvider store={store }>
    <App />
  </StoreProvider>,
  document.getElementById("root") as HTMLElement
);
