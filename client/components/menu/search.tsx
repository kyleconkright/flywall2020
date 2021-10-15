import Link from "next/link";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ChamberOptions, ChamberNumber } from "../../redux/sagas";
import {
  SenateCongressOptions,
  HouseCongressOptions,
} from "../../helpers/data/congresses";
import { loadMembers, updateChamber } from "../../redux/actions";
import { connect } from "react-redux";
import Button from "../ui/button";

const Search = (props) => {
  return (
    <ul className="inline-list">
      <li className="mr-h">

        <Button
          action={() => props.handleSelect("senate", props.chamberNumber)}
          text="Senate"
        />
      </li>
      <li>
        <Button
          action={() => props.handleSelect("house", props.chamberNumber)}
          text="House"
        />

      </li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    members: state.members,
    chamberNumber: state.chamberNumber,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    handleSelect: (chamber, number) => {
      dispatch(loadMembers(chamber, number));
      dispatch(updateChamber(chamber));
    },
  };
};

const SearchMenu = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchMenu;
