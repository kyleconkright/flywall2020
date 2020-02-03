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
function getMembers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(request.params.chamber, request.params.chamberNumber);
            const result = yield axios_1.default.get(propublica.members(request.params.chamber, request.params.chamberNumber), propublica.headers);
            response.json({ data: result.data.results });
        }
        catch (err) {
            console.log("err >> ", err.message);
            response.json({ err });
        }
    });
}
exports.getMembers = getMembers;
function getMember(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield axios_1.default.get(propublica.member(request.params.memberId), propublica.headers);
            response.json({ data: result.data.results });
        }
        catch (err) {
            response.json({ err });
        }
    });
}
exports.getMember = getMember;
function getMemberVotes(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield axios_1.default.get(propublica.memberVotes(request.params.memberId), propublica.headers);
            response.json({ data: result.data.results });
        }
        catch (err) {
            response.json({ err });
        }
    });
}
exports.getMemberVotes = getMemberVotes;
//# sourceMappingURL=members.js.map