const express = require("express")
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser")



const appInit = () => {
  //inicia express

  const api = express()


  //CONF CORS
  api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    api.options("*", (req, res) => {
      // allowed XHR methods
      res.header(
        "Access-Control-Allow-Methods",
        "GET, PATCH, PUT, POST, DELETE, OPTIONS"
      );
      res.send();
    });
  });

  //CONF DECODE BODYPARSER

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({ extended: true }));

  //CONFIGURACION para trabajar con cookies
  // api.use(cookieParser())


  return api
}

module.exports = {
  appInit: appInit
}