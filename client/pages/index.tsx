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
import Router from "next/router";
import Head from "next/head";

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

export const Grid = styled.ul`
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

  state = {
    compareMode: false,
    member1: null,
    member2: null
  };

  setCompareMembers = (id: string) => {
    if (this.state.member1) {
      this.setState({ member2: id }, () => {
        Router.push(
          `/compare/${this.state.member1}/${this.state.member2}/${this.props.chamber}/${this.props.chamberNumber}`
        );
      });
    } else {
      this.setState({ member1: id });
    }
  };

  render() {
    const members = this.props.members || [];
    return (
      <Container>
        <Head>
          <title>{`${this.props.chamber.toUpperCase()} - ${
            this.props.chamberNumber
          }`}</title>
        </Head>
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
          <button
            onClick={() =>
              this.setState({ compareMode: !this.state.compareMode })
            }
          >
            Compare Mode {this.state.compareMode && "Engaged"}
          </button>
        </Controls>
        <Grid>
          {members.map(member => {
            return (
              <MemberCard
                selectedMembers={[this.state.member1, this.state.member2]}
                setCompareMembers={this.setCompareMembers}
                compareMode={this.state.compareMode}
                key={member.id}
                member={member}
              />
            );
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
