import { Request, Response } from "express";

export class DeveloperRoutes {
    public routes(app:any): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })
    }
}