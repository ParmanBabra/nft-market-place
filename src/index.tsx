import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

const appID = process.env.REACT_APP_MORALIS_APPLICATION_ID as string;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL as string;

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MoralisProvider appId={appID} serverUrl={serverUrl}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MoralisProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
