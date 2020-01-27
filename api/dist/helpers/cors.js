"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = ['https://flywall.org', 'https://www.flywall.org', 'localhost', 'http://localhost:3000'];
exports.corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
//# sourceMappingURL=cors.js.map