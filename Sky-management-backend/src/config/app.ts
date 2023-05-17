import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(cors())
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}
export default new App().app;