import Link from "next/link";
import Head from "next/head";
import { Component } from "react";
import { connect } from "react-redux";
import { loadMembers, loadMembersClient } from "../redux/actions";
interface Props {
  members?: any;
  isServer?: boolean;
}

class Page extends Component<any> {
  static async getInitialProps(props) {
    const { isServer, store } = props.ctx;
    try {
      store.dispatch(loadMembers());

      return { isServer, store };
    } catch (error) {
      console.error(error);
      return { isServer, store };
    }
  }

  componentDidMount() {
    this.props.dispatch(loadMembersClient());
  }

  render() {
    const members = this.props.members || [];
    return (
      <div>
        <Head>
          <title>Senate Members</title>
        </Head>
        Members ({members.length})
        <ul>
          {members.map(member => {
            return (
              <li key={member.id}>
                <Link href={`/member/${member.id}`}>
                  <a>
                    {member.short_title} {member.first_name} {member.last_name}{" "}
                    ({member.id})
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(state => state)(Page);
