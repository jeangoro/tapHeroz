import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const container = document.getElementById("root");
const root = createRoot(container!);

const userInfos = JSON.parse(sessionStorage.getItem("user_infos")!);
const token: string = userInfos?.token;
const ID_JOUEUR: string = userInfos?.ID_JOUEUR;
const LOGIN: string = userInfos?.LOGIN;
const NOM_PRENOM: string = userInfos?.NOM_PRENOM;

// api_key = 'TSIGUIA_JEAN_goro_2000_testToken';
const Authorization = `Bearer ${token} ${ID_JOUEUR} ${LOGIN} ${NOM_PRENOM} `;

// axios.defaults.baseURL = "http://localhost:80/tap-heroz/";
axios.defaults.baseURL = "http://tapcompetition.reunioncfy.com/";
axios.defaults.headers.common["Authorization"] = Authorization;
axios.defaults.headers.post["Content-Type"] = "application/json";

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
