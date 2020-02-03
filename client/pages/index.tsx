import Link from "next/link";
import Head from "next/head";
import { Component } from "react";
import { connect } from "react-redux";
import { loadMembers, loadMembersClient } from "../redux/actions";
import styled from "styled-components";
import MemberCard from "../components/member-card";
import { ChamberOptions, ChamberNumber } from "../redux/sagas";
import { Dispatch } from "redux";
interface Props {
  members?: any;
  isServer?: boolean;
  chamber?: ChamberOptions;
  chamberNumber?: ChamberNumber;
  dispatch?: Dispatch;
}

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
`;

class Page extends Component<Props> {
  static async getInitialProps(props) {
    const { isServer, store } = props.ctx;
    const { chamber, chamberNumber } = store.getState();

    try {
      store.dispatch(loadMembers(chamber, chamberNumber));

      return { isServer, store };
    } catch (error) {
      console.error(error);
      return { isServer, store };
    }
  }

  componentDidMount() {
    this.props.dispatch(
      loadMembersClient(this.props.chamber, this.props.chamberNumber)
    );
  }

  render() {
    const members = this.props.members || [];
    return (
      <Grid>
        {members.map(member => {
          return <MemberCard key={member.id} member={member} />;
        })}
      </Grid>
    );
  }
}

export default connect(state => state)(Page);
