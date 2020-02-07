import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { theme } from "../../styles/theme";
import { formatDate } from "../../pages/member/[mid]";
import { Bar } from "../charts/bar";
import { Pie } from "../charts/pie";

interface Props {
  role: any;
}

/**
 * 
 *
 *
congress: "116"
chamber: "Senate"
title: "Senator, 1st Class"
short_title: "Sen."
state: "VT"
party: "ID"
leadership_role: null
fec_candidate_id: "H8VT01016"
seniority: "13"
senate_class: "1"
state_rank: "junior"
lis_id: "S313"
ocd_id: "ocd-division/country:us/state:vt"
start_date: "2019-01-03"
end_date: "2021-01-03"
office: "332 Dirksen Senate Office Building"
phone: "202-224-5141"
fax: null
contact_form: "http://www.sanders.senate.gov/contact/"
cook_pvi: null
dw_nominate: -0.526
ideal_point: null
next_election: "2024"
total_votes: 453
missed_votes: 278
total_present: 1
bills_sponsored: 27
bills_cosponsored: 332
missed_votes_pct: 61.37
votes_with_party_pct: 76.88
votes_against_party_pct: 23.12
 */

const chartSizes = { height: "300px" };

export function RoleDashboard(props: Props) {
  const { role } = props;
  const {
    party,
    congress,
    chamber,
    seniority,
    senate_class,
    state_rank,
    start_date,
    end_date,
    bills_sponsored,
    bills_cosponsored
  } = role;
  const pieColors = getPieColors(party);
  return (
    <div>
      <div>
        <div style={{ padding: "10px", margin: "10px" }}>{chamber} Info</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div>Seniority: {seniority}</div>
          <div>Party: {party}</div>
          <div>Class: {senate_class}</div>
          <div>Rank: {state_rank}</div>
          <div>
            State Date: {formatDate(start_date)} - End Date:
            {formatDate(end_date)}
          </div>
        </div>
      </div>

      <div style={{ padding: "10px", margin: "10px" }}>
        VOTING HISTORY for {congress} Congress
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <Bar
          {...chartSizes}
          data={[
            {
              id: "Bill Activity",
              sponsored: bills_sponsored,
              sponsoredColor: "#333",
              cosponsored: bills_cosponsored,
              cosponsoredColor: "#e2e"
            }
          ]}
          keys={["sponsored", "cosponsored"]}
          colors={["blue", "lightblue"]}
          config={{
            tooltip: d => `${d.id}: ${d.value}`
          }}
        />
        <Pie
          {...chartSizes}
          colors={pieColors}
          data={[
            {
              id: "votes_for",
              label: "Votes For",
              value: role.votes_with_party_pct
            },
            {
              id: "votes_against",
              label: "Votes Against",
              value: role.votes_against_party_pct
            }
          ]}
        />

        <Bar
          {...chartSizes}
          colors={[theme.teal, theme.orange1]}
          data={[
            {
              id: "Votes",
              "Cast Votes": role.total_votes - role.missed_votes,
              "Missed Votes": role.missed_votes
            }
          ]}
          keys={["Missed Votes", "Cast Votes"]}
          config={{
            tooltip: d => `${d.id}: ${d.value}`
          }}
        />
        <Pie
          {...chartSizes}
          colors={[theme.teal, theme.orange1]}
          data={[
            {
              id: "Votes Cast %",
              label: "Votes Cast %",
              value: 100 - role.missed_votes_pct
            },
            {
              id: "Missed Votes %",
              label: "Votes Missed",
              value: role.missed_votes_pct
            }
          ]}
        />
      </div>
    </div>
  );
}

export function getPartyColor(party: string) {
  switch (party) {
    case "R":
      return theme.rep;

    case "D":
      return theme.dem;

    default:
      return theme.ind;
  }
}
export function getPieColors(party: string) {
  switch (party) {
    case "R":
    case "r":
      return [theme.rep, theme.dem];

    case "D":
    case "d":
      return [theme.dem, theme.rep];

    default:
      return [theme.ind, "#5B3EB3"];
  }
}
