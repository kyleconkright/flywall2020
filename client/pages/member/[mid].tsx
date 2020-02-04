import Head from "next/head";
import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {
  RoleDashboard,
  getPartyColor,
  getPieColors
} from "../../components/member-page/role-dashboard";
import { ResponsiveBar } from "@nivo/bar";
import { MemberRssFeed } from "../../components/member-page/rss-feed";
import { Bar } from "../../components/charts/bar";
interface Props {
  member?: any;
  latestCongress: number;
}

class MemberIdPage extends Component<Props> {
  static async getInitialProps({ ctx }) {
    try {
      const res: any = await axios.get(
        `http://localhost:2020/api/member/${ctx.query.mid}`
      );
      const member = res.data.data[0];
      return { member, latestCongress: member.roles[0].congress };
    } catch (error) {
      console.log("GET Member Error", error);
      return { member: null };
    }
  }

  state = {
    congress: this.props.latestCongress
  };

  render() {
    const { member } = this.props;
    if (!member) {
      return <div>Working on it.</div>;
    }

    const latestInfo = member.roles[0];
    const { party } = latestInfo;
    const selectedRole = member.roles.find(
      r => r.congress === this.state.congress
    );

    return (
      <div>
        <hr></hr>
        <Head>
          <title>{`${member.first_name} ${member.middle_name || ""} ${
            member.last_name
          } (${party} - ${latestInfo.state})`}</title>
        </Head>
        <div>
          <div>
            ({party} - {latestInfo.state}) {member.first_name}{" "}
            {member.middle_name || ""}
            {member.last_name} ({latestInfo.state_rank})
            {member.is_active && (
              <div>Next Election: {latestInfo.next_election}</div>
            )}
            <div>Latest Vote Cast: {formatDate(member.most_recent_vote)}</div>
            <small>more info</small>
            <div>Last Congress: {latestInfo.congress}</div>
            {member.is_active && (
              <div>
                <div style={{ padding: "10px", margin: "10px" }}>
                  Contact Info
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr"
                  }}
                >
                  <div>Office: {latestInfo.office}</div>
                  <div>Phone: {latestInfo.phone}</div>
                  <div>Contact: {latestInfo.contact_form}</div>
                </div>
              </div>
            )}
          </div>
          <hr></hr>
          <div>
            <div>Party Line Vote</div>
            <Bar
              height="300px"
              colors={getPieColors(party)}
              data={member.roles.reduce((acc, r) => {
                if (!r.votes_against_party_pct) return acc;
                acc.push({
                  id: r.congress,
                  votesAgainst: r.votes_against_party_pct,
                  votesFor: r.votes_with_party_pct
                });
                return acc;
              }, [])}
              keys={["votesFor", "votesAgainst"]}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "3px"
            }}
          >
            <select
              value={this.state.congress}
              onChange={e => this.setState({ congress: e.currentTarget.value })}
            >
              {member.roles.map(r => (
                <option value={r.congress} key={r.congress}>
                  {r.congress}
                </option>
              ))}
            </select>
          </div>
          <RoleDashboard role={selectedRole} />
          {member.rss_url && <MemberRssFeed url={member.rss_url} />}
        </div>
      </div>
    );
  }
}

export default connect(state => state)(MemberIdPage);

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}
