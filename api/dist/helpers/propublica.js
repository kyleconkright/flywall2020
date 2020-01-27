"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function members(chamber) {
    const url = `https://api.propublica.org/congress/v1/116/${chamber}/members.json`;
    return url;
}
exports.members = members;
function member(memberId) {
    const url = `https://api.propublica.org/congress/v1/members/${memberId}.json`;
    return url;
}
exports.member = member;
function memberVotes(memberId) {
    const url = `https://api.propublica.org/congress/v1/members/${memberId}/votes.json`;
    return url;
}
exports.memberVotes = memberVotes;
function session(session, rollCall) {
    const url = `https://api.propublica.org/congress/v1/116/senate/sessions/${session}/votes/${rollCall}.json`;
    return url;
}
exports.session = session;
exports.headers = {
    headers: { 'X-API-Key': process.env.PROPUBLICA_KEY }
};
//# sourceMappingURL=propublica.js.map