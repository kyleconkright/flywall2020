"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { DatabaseClient } from '../database';
// const firebase = new DatabaseClient();
const members_1 = require("../controllers/members");
const sessions_1 = require("../controllers/sessions");
class Routes {
    routes(app) {
        app.route('/').get((req, res) => {
            res.status(200).json({
                message: 'express firebase success'
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
        app.get('/api/members', members_1.getMembers);
        app.get('/api/member/:memberId', members_1.getMember);
        app.get('/api/member/:memberId/votes', members_1.getMemberVotes);
        app.get('/api/session/:session/:rollCall', sessions_1.getSession);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map