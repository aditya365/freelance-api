import express from "express";
import * as bodyParser from "body-parser";
import { deflate } from "zlib";
import mongoose from "mongoose";
import "reflect-metadata";
import "typedi";

// import * as passport from "passport.jwt";
import { UserRoutes } from "./routes/user.routes";
import { SkillRoutes } from "./routes/skill.routes"
require('./passport.jwt');
require('./passport.local');

class App {
    public app: express.Application;
    // public developerRoutes = new DeveloperRoutes();
    public skillRoutes = new SkillRoutes();
    public userRoutes = new UserRoutes();

    //connecting mongoose db
    public mongoUrl: string = "mongodb+srv://aditya:aditya@cluster0-5clo6.mongodb.net/test?retryWrites=true&w=majority"

    constructor() {
        this.app = express();
        this.config();
        this.configRoutes();
        this.mongoSetup();
    }

    //middleware
    //configures app
    private config(): void {

        //to parse application/json post data
        this.app.use(bodyParser.json())

        //tp suppport application/x-ww-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    private configRoutes(): void {
        // this.developerRoutes.routes(this.app);
        this.skillRoutes.routes(this.app);
        this.userRoutes.routes(this.app);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}

export default new App().app