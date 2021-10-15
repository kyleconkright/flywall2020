const LATEST_SENATE = "116";
const LATEST_HOUSE = "116";

// 102-116 for House, 80-116 for Senate
type ChamberOptions = "senate" | "house";
export function members(chamber: ChamberOptions, congressNumber?: string) {
  switch (chamber) {
    case "house":
      return `https://api.propublica.org/congress/v1/${congressNumber ||
        LATEST_HOUSE}/${chamber}/members.json`;
    case "senate":
      return `https://api.propublica.org/congress/v1/${congressNumber ||
        LATEST_SENATE}/${chamber}/members.json`;
  }
}

export function member(memberId) {
  const url = `https://api.propublica.org/congress/v1/members/${memberId}.json`;
  return url;
}

export function memberVotes(memberId) {
  const url = `https://api.propublica.org/congress/v1/members/${memberId}/votes.json`;
  return url;
}

export function session(session, rollCall) {
  const url = `https://api.propublica.org/congress/v1/116/senate/sessions/${session}/votes/${rollCall}.json`;
  return url;
}
export function compareMembers(
  member1: string,
  member2: string,
  congress: string,
  chamber: ChamberOptions
) {
  return `https://api.propublica.org/congress/v1/members/${member1}/votes/${member2}/${congress}/${chamber}.json`;
}
export function createSearchBills(query: string = "") {
  return `https://api.propublica.org/congress/v1/bills/search.json?query=${query}`;
}

export function getSingleBill(billId: string, congress: string) {
  return `https://api.propublica.org/congress/v1/${congress}/bills/${billId}.json`;
}

export const headers = {
  headers: { "X-API-Key": process.env.PROPUBLICA_KEY }
};
