import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadFullCongress, updateChamberNumber } from "../redux/actions";
import { ChamberNumber } from "../redux/sagas";
import { getPartyColor } from "../components/member-page/role-dashboard";
import { Waffle } from "../components/charts/waffle";
import { theme } from "../styles/theme";
import { Sunburst } from "../components/charts/sunburst";
import { HouseCongressOptions } from "../helpers/data/congresses";
import { Network } from "../components/charts/network";

interface Props {
  fullCongress: { house: any[]; senate: any[] };
  chamberNumber: ChamberNumber;
  loadFullCongress(v: number): void;

  updateChamberNumber(v: number): void;
}

const chartSizes = { height: "1000px" };
class CongressBreakDown extends Component<Props> {
  static async getInitialProps(props) {
    const { isServer, store } = props.ctx;
    const { chamberNumber } = store.getState();

    try {
      store.dispatch(loadFullCongress(chamberNumber));
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
          this.props.loadFullCongress(value);
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
    const { fullCongress } = this.props;
    const { house, senate } = fullCongress;
    const { senateCount } = senate.reduce(
      (acc, m) => {
        switch (m.party) {
          case "R":
            acc.senateCount.rep = acc.senateCount.rep + 1;
            return acc;
          case "D":
            acc.senateCount.dem = acc.senateCount.dem + 1;
            return acc;
          default:
            acc.senateCount.ind = acc.senateCount.ind + 1;
            return acc;
        }
      },
      {
        senateCount: { rep: 0, dem: 0, ind: 0 }
      }
    );
    const { houseCount } = house.reduce(
      (acc, m) => {
        switch (m.party) {
          case "R":
            acc.houseCount.rep = acc.houseCount.rep + 1;
            return acc;
          case "D":
            acc.houseCount.dem = acc.houseCount.dem + 1;
            return acc;
          default:
            acc.houseCount.ind = acc.houseCount.ind + 1;
            return acc;
        }
      },
      {
        houseCount: { rep: 0, dem: 0, ind: 0 }
      }
    );

    // {
    //     "name": "stack",
    //     "color": "hsl(338, 70%, 50%)",
    //     "children": [
    //     ]
    //   },

    const houseBurst = Object.entries(fullCongress).reduce(
      (acc, [k, m]) => {
        const firstChildren: Map<string, Set<object>> = m.reduce(
          (secondAcc: Map<string, Set<object>>, member) => {
            const item = {
              id: `${member.first_name} ${member.last_name}`,
              color: getPartyColor(member.party),
              partyColor: getPartyColor(member.party)
            };

            if (secondAcc.has(member.state)) {
              const old = secondAcc.get(member.state);
              old.add(item);
            } else {
              secondAcc.set(member.state, new Set([item]));
            }
            return secondAcc;
          },
          new Map()
        );

        const children = Array.from(firstChildren).map(([k, c], i) => {
          return {
            id: k,
            color: "yellow",
            children: Array.from(c).map(b => {
              return {
                ...b,
                value: c.size
              };
            })
          };
        });

        const highLevel = {
          id: k,
          color: theme.grey,
          children
        };
        acc[k] = highLevel;
        return acc;
      },
      { senate: {}, house: {} }
    );

    // LInk
    // {
    //     "source": "0",
    //     "target": "1",
    //     "distance": 50
    //   },

    // nodes
    // {
    //     "id": "14.5",
    //     "radius": 4,
    //     "depth": 2,
    //     "color": "rgb(232, 193, 160)"
    //   }
    let latestNumber = 2;

    function generateComponentKey(prefix = "missing") {
      return `${prefix || "missing"}-${latestNumber++}`;
    }

    const houseSize = Math.ceil(Math.sqrt(house.length));
    return (
      <div>
        <div>{this.renderOptions(HouseCongressOptions)} Congress</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            Senate
            <div>{JSON.stringify(senateCount)}</div>
            <Waffle
              {...chartSizes}
              total={senate.length}
              data={[
                { id: "democrats", label: "Dem", value: senateCount.dem },
                { id: "republicans", label: "Rep", value: senateCount.rep },
                { id: "independent", label: "Ind", value: senateCount.ind }
              ]}
              colors={[theme.dem, theme.rep, theme.ind]}
              config={{
                rows: 10,
                columns: 10,
                tooltip: d => {
                  return <div>{`${d.label} - ${d.value} `}</div>;
                }
              }}
            />
            <Sunburst
              {...chartSizes}
              colors={[theme.dem, theme.rep, theme.ind]}
              data={houseBurst.senate}
              config={{
                tooltip: d => {
                  return <div>{`${d.label} - ${d.value} `}</div>;
                }
              }}
            />
          </div>

          <div>
            <div>House{JSON.stringify(houseCount)}</div>
            <Waffle
              {...chartSizes}
              total={house.length}
              data={[
                { id: "democrats", label: "Dem", value: houseCount.dem },
                { id: "republicans", label: "Rep", value: houseCount.rep },
                { id: "independent", label: "Ind", value: houseCount.ind }
              ]}
              colors={[theme.dem, theme.rep, theme.ind]}
              config={{
                rows: houseSize,
                columns: houseSize,
                tooltip: d => `${d.label} - ${d.value} `
              }}
            />
            <Sunburst
              {...chartSizes}
              //   colors={[theme.dem, theme.rep, theme.ind]}
              data={houseBurst.house}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps() {
  return dispatch =>
    bindActionCreators({ loadFullCongress, updateChamberNumber }, dispatch);
}

export default connect(state => state, mapDispatchToProps)(CongressBreakDown);
