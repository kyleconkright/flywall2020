import React, { Component } from "react";
import { MemberVote } from "../../pages/member/[mid]";
import styled from "styled-components";
import { theme } from "../../styles/theme";

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

export class VoteCard extends Component<Props> {
  render() {
    return (
      <VoteListContainer>
        {this.props.votes.map(vote => {
          return (
            <VoteContainer key={vote.bill.bill_id}>
              <div className="bill-id">
                <span>
                  {vote.bill.number} | {vote.bill.bill_id}
                </span>
                <span>
                  (
                  <span className="vote">
                    {renderVotePosition(vote.position)}
                  </span>
                  <span>
                    {vote.chamber}-{vote.congress}-{vote.session}
                  </span>
                  )
                </span>
              </div>
              <hr />
              <small className="description">{vote.description}</small>
              <hr />
              {vote.bill.latest_action && (
                <div>
                  <small>
                    Latest Action:
                    <small>{vote.bill.latest_action}</small>
                  </small>
                  <hr />
                </div>
              )}
              {/* <div className="title">{vote.bill.title}</div> */}
              Total:
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
