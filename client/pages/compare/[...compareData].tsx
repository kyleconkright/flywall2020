import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import Head from "next/head";
import Router from "next/router";
import { theme } from "../../styles/theme";
import { Bar } from "../../components/charts/bar";
import { Pie } from "../../components/charts/pie";
import Link from "next/link";

const StyledComparedPage = styled.div`
  .info {
  }
  .members {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
      const [member1, member2, chamber, chamberNumber] = ctx.query.compareData;
      const res: any = await axios.get(
        `${process.env.API_URL}/compare/${member1}/${member2}/${chamber}/${chamberNumber}`
      );
      const member1Res: any = await axios.get(
        `${process.env.API_URL}/member/${member1}/`
      );
      const member2Res: any = await axios.get(
        `${process.env.API_URL}/member/${member2}`
      );

      return {
        compareData: res.data.data,
        member1: member1Res.data.data[0],
        member2: member2Res.data.data[0],
      };
    } catch (error) {
      console.log("GET Member Error", error);
      return { member: null };
    }
  }
  render() {
    if (!this.props.compareData) {
      return (
        <div>
          Sorry for the inconvenience something has come up.
          <button
            onClick={(e) => {
              e.preventDefault();
              Router.back();
            }}
          >
            Back
          </button>
        </div>
      );
    }

    const { member1, member2, compareData } = this.props;
    const lastRole1 = member1.roles[0];
    const lastRole2 = member2.roles[0];
    const {
      congress,
      chamber,
      common_votes,
      disagree_votes,
      agree_percent,
      disagree_percent,
    } = compareData;
    console.log(" > ", this.props);
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
        <Head>
          <title>{`${member1.last_name} v. ${member2.last_name}`}</title>
        </Head>
        <div className="members">
          <div>
            <Link href={`/member/${member1.id}`}>
              <a>
                {lastRole1.short_title} {member1.last_name}
              </a>
            </Link>
          </div>
          <div>
            <div>In the {congress} Congress</div>
            <div>Agree {agree_percent}%</div>
            <div>Disagree {disagree_percent}%</div>

            <div
              style={{
                borderTop: "1px solid ",
                width: "fit-content",
                paddingTop: "5px",
                marginTop: "5px",
              }}
            >
              Out of {common_votes} votes
            </div>
          </div>

          <div>
            <Link href={`/member/${member2.id}`}>
              <a>
                {lastRole2.short_title} {member2.last_name}
              </a>
            </Link>
          </div>
        </div>
        <div className="stats">
          <Pie
            width={"400px"}
            height={"400px"}
            colors={[theme.teal, theme.orange1]}
            data={[
              {
                id: "Agree %",
                label: "Agree %",
                value: agree_percent,
              },
              {
                id: "Disagree %",
                label: "Disagree %",
                value: disagree_percent,
              },
            ]}
          />
          <Bar
            height={"400px"}
            width={"400px"}
            colors={[theme.teal, theme.orange1]}
            data={[
              {
                id: "Votes",
                agreeVotes: common_votes - disagree_votes,
                disagreeVotes: disagree_votes,
              },
            ]}
            keys={["agreeVotes", "disagreeVotes"]}
          />
        </div>
      </StyledComparedPage>
    );
  }
}

export default connect((state) => state)(ComparePage);
