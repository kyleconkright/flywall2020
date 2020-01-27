"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT ? process.env.PORT : 2020;
app_1.default.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT} in the ${process.env.NODE_ENV} environment`);
    console.log(`API ${process.env.API_URL}`);
});
//# sourceMappingURL=server.js.map