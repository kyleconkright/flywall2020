import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { ChamberOptions, ChamberNumber } from "../../redux/sagas";
import {
  SenateCongressOptions,
  HouseCongressOptions
} from "../../helpers/data/congresses";
import { loadMembers } from '../../redux/actions';
import { connect } from 'react-redux';
import Button from '../ui/button';

const Search = (props) => {

  return (
    <ul className="inline-list">
      <li className="mr-h">
        <Button action={() => props.handleSelect('senate')} text="Senate" />
      </li>
      <li>
        <Button action={() => props.handleSelect('house')} text="House" />
      </li>
      {/* <form action="submit">
          <select onChange={e => props.handleSelect(e.target.value)}>
            <option value="senate">Senate</option>
            <option value="house">House</option>
          </select>
      </form> */}
    </ul>
  )
}



const mapStateToProps = (state) => {
  return {
    members: state.members,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSelect: (chamber) => {
      dispatch(loadMembers(chamber, 116))
    }
  }
}

const SearchMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default SearchMenu;

