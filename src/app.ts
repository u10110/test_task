import express from "express";
import * as bodyParser from "body-parser";
import {routes} from "./routes";


const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(8080, () => {
    console.log('Server started at port 8080');
});