"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const propublica = require("../helpers/propublica");
function getSession(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(request.params);
        try {
            const result = yield axios_1.default.get(propublica.session(request.params.session, request.params.rollCall), propublica.headers);
            response.json({ data: result.data.results });
        }
        catch (err) {
            response.json({ err });
        }
    });
}
exports.getSession = getSession;
//# sourceMappingURL=sessions.js.map