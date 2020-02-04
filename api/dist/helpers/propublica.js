"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LATEST_SENATE = "116";
const LATEST_HOUSE = "116";
function members(chamber, congressNumber) {
    switch (chamber) {
        case "house":
            return `https://api.propublica.org/congress/v1/${congressNumber ||
                LATEST_HOUSE}/${chamber}/members.json`;
        case "senate":
            return `https://api.propublica.org/congress/v1/${congressNumber ||
                LATEST_SENATE}/${chamber}/members.json`;
    }
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
function compareMembers(member1, member2, congress, chamber) {
    return `https://api.propublica.org/congress/v1/members/${member1}/votes/${member2}/${congress}/${chamber}.json`;
}
exports.compareMembers = compareMembers;
exports.headers = {
    headers: { "X-API-Key": process.env.PROPUBLICA_KEY }
};
//# sourceMappingURL=propublica.js.map