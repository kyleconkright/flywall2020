"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { DatabaseClient } from '../database';
// const firebase = new DatabaseClient();
const members_1 = require("../controllers/members");
const bills_1 = require("../controllers/bills");
class Routes {
    routes(app) {
        app.route("/").get((req, res) => {
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
        app.get("/api/members/:chamber/:chamberNumber", members_1.getMembers);
        //     GET https://api.propublica.org/congress/v1/members/{chamber}/{state}/current.json
        app.get("/api/members/senate/:state/current", (req, res) => res.json({ senate: "for state" }));
        // GET https://api.propublica.org/congress/v1/members/{chamber}/{state}/{district}/current.json
        app.get("/api/members/house/:state/:district/current", (req, res) => res.json({ house: "members for district" }));
        // "https://api.propublica.org/congress/v1/:congress/:chamber/members/leaving.json"
        app.get("/api/members/leaving/:congress/:chamber", (req, res) => res.json({ weAre: "leaving" }));
        app.get("/api/member/:memberId", members_1.getMember);
        app.get("/api/member/:memberId/votes", members_1.getMemberVotes);
        app.get("/api/compare/:member1/:member2/:chamber/:congressNumber", members_1.getCompareMembers);
        // https://api.propublica.org/congress/v1/members/{member-id}/office_expenses/{year}/{quarter}.json
        app.get("/api/member/:memberId/:year/:quarter/spending", (req, res) => res.json({ member: "spending" }));
        // app.get("/api/session/:session/:rollCall", getSession);
        // app.get("/api/session/:session/:rollCall", getSession);
        /////////////////////////////////////////////////////
        //////////////        BILLS          ////////////////
        /////////////////////////////////////////////////////
        // https://api.propublica.org/congress/v1/bills/search.json?query={query}
        app.post("/api/bills/search", bills_1.searchBills);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map