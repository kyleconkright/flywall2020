import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
const StyledComparedPage = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 1fr;
  .info {
  }
  .members {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

class ComparePage extends Component<any> {
  static async getInitialProps({ ctx }) {
    try {
      const res: any = await axios.get(
        `http://localhost:2020/api/compare/${ctx.query.member1}/${ctx.query.member2}/senate/116`
      );
      return { compareData: res.data.data };
    } catch (error) {
      console.log("GET Member Error", error);
      return { member: null };
    }
  }
  render() {
    const {
      first_member_id,
      first_member_api_uri,
      second_member_id,
      second_member_api_uri,
      congress,
      chamber,
      common_votes,
      disagree_votes,
      agree_percent,
      disagree_percent
    } = this.props.compareData;
    // first_member_id
    // first_member_api_uri
    // second_member_id
    // second_member_api_uri
    // congress
    // chamber
    // common_votes
    // disagree_votes
    // agree_percent
    // disagree_percent
    return (
      <StyledComparedPage>
        <div className="info">
          Chamber: {chamber}
          <br />
          Congress: {congress}
        </div>

        <div className="stats">
          <div>common Votes: {common_votes}</div>
          <div>Agree %: {agree_percent}%</div>
          <div>Disagree Votes: {disagree_votes}</div>
          <div>Disagree %: {disagree_percent}%</div>
          <div style={{ width: "400px", height: "400px" }}>
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
              colors={["green", "red"]}
              data={[
                {
                  id: "Agree %",
                  label: "Agree %",
                  value: agree_percent
                },
                {
                  id: "Disagree %",
                  label: "Disagree %",
                  value: disagree_percent
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
          <div style={{ width: "400px", height: "400px" }}>
            <ResponsiveBar
              colors={["green", "red"]}
              data={[
                {
                  category: "Votes",
                  commonVotes: common_votes,
                  disagreeVotes: disagree_votes
                }
              ]}
              keys={["commonVotes", "disagreeVotes"]}
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
        </div>

        <div className="members">
          <div>{first_member_id}</div>
          <div>{second_member_id}</div>
        </div>
      </StyledComparedPage>
    );
  }
}

export default connect(state => state)(ComparePage);
