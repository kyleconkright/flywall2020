import Link from "next/link";
import Head from "next/head";
import { Component } from "react";
import { connect } from "react-redux";
import {
  loadMembers,
  updateChamber,
  updateChamberNumber
} from "../redux/actions";
import styled from "styled-components";
import MemberCard from "../components/member-card";
import { ChamberOptions, ChamberNumber } from "../redux/sagas";
import { Dispatch, bindActionCreators } from "redux";
import {
  SenateCongressOptions,
  HouseCongressOptions
} from "../helpers/data/congresses";

interface Props {
  members?: any;
  isServer?: boolean;
  chamber?: ChamberOptions;
  chamberNumber?: ChamberNumber;
  dispatch?: Dispatch;

  updateChamber(d: ChamberOptions): void;
  updateChamberNumber(d: ChamberNumber): void;
  loadMembers(chamber: ChamberOptions, chamberNumber: ChamberNumber): void;
}

const Container = styled.div``;

const Controls = styled.div``;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
`;

class MembersListPage extends Component<Props> {
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

  renderOptions = options => {
    return (
      <select
        onChange={e => {
          const value: ChamberNumber = Number(e.currentTarget.value);
          this.props.updateChamberNumber(value);
          this.props.loadMembers(this.props.chamber, value);
        }}
        value={this.props.chamberNumber}
      >
        {options.map(v => {
          return (
            <option key={v} value={v}>
              {v}
            </option>
          );
        })}
      </select>
    );
  };

  render() {
    const members = this.props.members || [];
    return (
      <Container>
        <Controls>
          <form action="submit">
            <div>
              <select
                onChange={e => {
                  this.props.updateChamber(
                    e.currentTarget.value as ChamberOptions
                  );
                  this.props.loadMembers(
                    e.currentTarget.value as ChamberOptions,
                    this.props.chamberNumber
                  );
                }}
                value={this.props.chamber}
              >
                <option value="senate">Senate</option>
                <option value="house">House</option>
              </select>
            </div>
            <div>
              {this.renderOptions(
                this.props.chamber === "house"
                  ? HouseCongressOptions
                  : SenateCongressOptions
              )}
            </div>
          </form>
        </Controls>
        <Grid>
          {members.map(member => {
            return <MemberCard key={member.id} member={member} />;
          })}
        </Grid>
      </Container>
    );
  }
}

function mapDispatchToProps() {
  return dispatch =>
    bindActionCreators(
      { updateChamber, loadMembers, updateChamberNumber },
      dispatch
    );
}

export default connect(state => {
  return state;
}, mapDispatchToProps)(MembersListPage);
