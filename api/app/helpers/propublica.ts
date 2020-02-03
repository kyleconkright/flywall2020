const LATEST_SENATE = "116";
const LATEST_HOUSE = "116";

// 102-116 for House, 80-116 for Senate

export function members(chamber: "senate" | "house", congressNumber?: string) {
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

export const headers = {
  headers: { "X-API-Key": process.env.PROPUBLICA_KEY }
};
