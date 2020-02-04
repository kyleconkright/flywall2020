import Head from "next/head";
import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { theme } from "../../styles/theme";
import {
  RoleDashboard,
  getPartyColor
} from "../../components/member-page/role-dashboard";
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
    const party = member.current_party;
    const selectedRole = member.roles.find(
      r => r.congress === this.state.congress
    );
    const partyColor = getPartyColor(party);
    return (
      <div>
        <hr></hr>
        <Head>
          <title>{`${member.first_name} ${member.last_name}`}</title>
        </Head>
        <div>
          <div>
            Member Name: {member.first_name} {member.last_name} ({member.id})
            <div>rank: {latestInfo.state_rank}</div>
            <div>party: {party}</div>
            <div>Last Congress: {latestInfo.congress}</div>
            <div>Next Election: {latestInfo.next_election}</div>
          </div>
          <hr></hr>
          Stats:
          <div>Latest Vote Cast: {member.most_recent_vote}</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridGap: "3px"
            }}
          >
            {member.roles.map(r => (
              <span
                style={{
                  color: partyColor,
                  border:
                    r.congress === this.state.congress
                      ? `2px solid ${partyColor}`
                      : `1px solid ${partyColor}`,
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  padding: "10px"
                }}
                onClick={() => this.setState({ congress: r.congress })}
                key={r.congress}
              >
                {r.congress}
              </span>
            ))}
          </div>
          <RoleDashboard role={selectedRole} />
        </div>
      </div>
    );
  }
}

export default connect(state => state)(MemberIdPage);
