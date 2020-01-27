export function members(chamber) {
  const url = `https://api.propublica.org/congress/v1/116/${chamber}/members.json`
  return url;
}

export function member(memberId) {
  const url = `https://api.propublica.org/congress/v1/members/${memberId}.json`
  return url;
}

export function memberVotes(memberId) {
  const url = `https://api.propublica.org/congress/v1/members/${memberId}/votes.json`
  return url;
}

export function session(session, rollCall) {
  const url = `https://api.propublica.org/congress/v1/116/senate/sessions/${session}/votes/${rollCall}.json`
  return url;
}

export const headers = {
  headers: { 'X-API-Key': process.env.PROPUBLICA_KEY }
};