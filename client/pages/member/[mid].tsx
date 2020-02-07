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
import { ChamberOptions, ChamberNumber } from "../../redux/sagas";
import { VoteCard } from "../../components/member-page/votes-list";
interface Props {
  member?: any;
  latestCongress: number;
  votes: MemberVote[];
}

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

class MemberIdPage extends Component<Props> {
  static async getInitialProps({ ctx }) {
    try {
      const res: any = await axios.get(
        `http://localhost:2020/api/member/${ctx.query.mid}`
      );
      const votesRes: any = await axios.get(
        `http://localhost:2020/api/member/${ctx.query.mid}/votes`
      );
      const member = res.data.data[0];
      const votes = votesRes.data.data[0].votes;
      return { member, latestCongress: member.roles[0].congress, votes };
    } catch (error) {
      console.log("GET Member Error", error);
      return { member: null };
    }
  }

  state = {
    congress: this.props.latestCongress
  };

  render() {
    const { member, votes } = this.props;
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
            {member.last_name}
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
                  "Voted Against Party": r.votes_against_party_pct,
                  "Voted With Party": r.votes_with_party_pct
                });
                return acc;
              }, [])}
              keys={["Voted With Party", "Voted Against Party"]}
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
          {votes.length ? <VoteCard votes={votes} /> : null}
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
