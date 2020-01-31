"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// import { corsOptions } from './utils/cors-options';
const routes_1 = require("./routes");
// import { isDevEnv } from "./controllers/utilities";
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map