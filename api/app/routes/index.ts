import { Request, Response } from "express";

// import { DatabaseClient } from '../database';

// const firebase = new DatabaseClient();

import {
  getMembers,
  getMember,
  getMemberVotes,
  getCompareMembers
} from "../controllers/members";
import { getSession } from "../controllers/sessions";

export class Routes {
  public routes(app: any): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).json({
        message: "express firebase success"
      });
    });
    // app.get('/api', (request: Request, response: Response) => {
    //   response.status(200).json({
    //     message: 'FlyWall API'
    //   })
    // });

    // app.get('/vinyl/delete/:source/:key', (request: Request, response: Response) => {
    //   console.log(request.params)
    //   if (request.params.key !== '513ef8be-3e5c-4701-9ef1-dc8191af7e54') {
    //     return response.send('invalid key');
    //   }
    // });

    app.get("/api/members/:chamber/:chamberNumber", getMembers);
    app.get(
      "/api/compare/:member1/:member2/:chamber/:congressNumber",
      getCompareMembers
    );
    app.get("/api/member/:memberId", getMember);
    app.get("/api/member/:memberId/votes", getMemberVotes);

    app.get("/api/session/:session/:rollCall", getSession);
  }
}
