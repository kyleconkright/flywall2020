import React, { Component } from "react";

import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ChamberOptions, ChamberNumber } from "../../redux/sagas";

export interface MemberVote {
  member_id: string;
  chamber: ChamberOptions;
  congress: ChamberNumber;
  session: number;
  roll_call: number;
  vote_uri: string;
  bill: {
    bill_id: string;
    number: string;
    sponsor_id: string;
    bill_uri: string;
    title: string;
    latest_action: string;
  };
  amendment: object;
  description: string;
  question: string;
  result: string;
  date: Date;
  time: Date;
  total: { yes: number; no: number; present: number; not_voting: number };
  position: "Yes" | "No";
}

const VoteListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const VoteContainer = styled.div`
  margin: 10px;
  padding: 10px;
  background: ${theme.grey1};
  .title {
    width: 100%;
    text-overflow: ellipsis;
    word-break: keep-all;
    word-wrap: normal;
  }

  .bill-id {
    display: flex;
    justify-content: space-between;
  }
`;

const TotalValues = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
`;

interface Props {
  votes: MemberVote[];
}

function renderVotePosition(position: "Yes" | "No" | null) {
  switch (position) {
    case "No":
      return <span>🖕🏽</span>;
    case "Yes":
      return <span>👍🏽</span>;
    default:
      return <span>🤐</span>;
  }
}

function getVoteColor(result) {
  switch (result) {
    case "Failed":
      return theme.rep;
    case "Passed":
      return theme.green;

    default:
      return theme.orange1;
  }
}

export class VoteCard extends Component<Props> {
  render() {
    return (
      <VoteListContainer>
        {this.props.votes.map((vote, i) => {
          const color = getVoteColor(vote.result);
          return (
            <VoteContainer key={`${vote.bill.bill_id} ${i}`}>
              <div className="bill-id">
                <span>
                  {vote.bill.number} | {vote.bill.bill_id}{" "}
                  <small style={{ color }}>({vote.result})</small>
                </span>
                <span>
                  (
                  <span>
                    {vote.chamber}-{vote.congress}-{vote.session}
                  </span>
                  )
                </span>
              </div>
              <hr />
              <small className="vote">
                <div>
                  <small>Position</small>
                </div>
                {renderVotePosition(vote.position)}
              </small>
              <hr />
              <small className="description">
                <div>
                  <small>Description</small>
                </div>
                {vote.description}
              </small>
              <hr />
              {vote.bill.latest_action && (
                <div>
                  <small>
                    <div>
                      <small>Last Action</small>
                    </div>

                    <small>{vote.bill.latest_action}</small>
                  </small>
                  <hr />
                </div>
              )}
              {/* <div className="title">{vote.bill.title}</div> */}
              <div>
                <small>
                  <small>Total</small>
                </small>
              </div>
              <TotalValues className="final-votes">
                <small>yes: {vote.total.yes}</small>
                <small>no: {vote.total.no}</small>
                <small>present: {vote.total.present}</small>
                <small>not voting: {vote.total.not_voting}</small>
              </TotalValues>
            </VoteContainer>
          );
        })}
      </VoteListContainer>
    );
  }
}
