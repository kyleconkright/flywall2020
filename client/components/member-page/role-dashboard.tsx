import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { theme } from "../../styles/theme";

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

const chartSizes = { width: "500px", height: "500px" };

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
    next_election,
    bills_sponsored,
    bills_cosponsored
  } = role;
  const pieColors = getPieColors(party);
  return (
    <div>
      <div>
        <div style={{ padding: "10px", margin: "10px" }}>{chamber} Info</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Seniority: {seniority}</div>
          <div>Class: {senate_class}</div>
          <div>Rank: {state_rank}</div>
          <div>State Date: {new Date(start_date).toDateString()}</div>
          <div>End Date: {new Date(end_date).toDateString()}</div>
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
        <div style={chartSizes}>
          <ResponsiveBar
            data={[
              {
                type: "Sponsored",
                sponsored: bills_sponsored,
                sponsoredColor: "#333"
              },
              {
                type: "Cosponsored",
                cosponsored: bills_cosponsored,
                cosponsoredColor: "#e2e"
              }
            ]}
            keys={["sponsored", "cosponsored"]}
            indexBy="type"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: "green_blue" }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
        <div style={chartSizes}>
          <ResponsiveBar
            colors={{ scheme: "purple_blue" }}
            data={[
              {
                category: "Total Votes",
                totalVotes: role.total_votes,
                totalVotesColor: "#333"
              },
              {
                category: "Breakdown",
                castVotes: role.total_votes - role.missed_votes,
                castVotesColor: "#e2e",
                missedVotes: role.missed_votes
              }
            ]}
            keys={["totalVotes", "missedVotes", "castVotes"]}
            indexBy="category"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        </div>
        <div style={chartSizes}>
          <ResponsivePie
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={3}
            cornerRadius={5}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            slicesLabelsSkipAngle={30}
            slicesLabelsTextColor="#fff"
            animate
            colors={["green", "grey"]}
            data={[
              {
                id: "Votes Cast %",
                label: "Votes Cast %",
                value: 100 - role.missed_votes_pct
              },
              {
                id: "Missed Votes %",
                label: "Votes Against",
                value: role.missed_votes_pct
              }
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000"
                    }
                  }
                ]
              }
            ]}
          />
        </div>
        <div style={chartSizes}>
          <ResponsivePie
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={3}
            cornerRadius={5}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            slicesLabelsSkipAngle={30}
            slicesLabelsTextColor="#fff"
            animate
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
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000"
                    }
                  }
                ]
              }
            ]}
          />
        </div>
        <hr></hr>
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
      return [theme.rep, theme.dem];

    case "D":
      return [theme.dem, theme.rep];

    default:
      return [theme.ind, "#5B3EB3"];
  }
}
