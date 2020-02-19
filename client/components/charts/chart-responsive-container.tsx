import React, { Component, ReactChildren } from "react";
import { generateComponentKey } from "../member-page/rss-feed";

interface Props {
  children(props: { height: number; width: number }): JSX.Element;
}
interface State {
  height: number;
  width: number;
}

export default class ResponsiveChart extends Component<Props, State> {
  id: string;
  state = { height: 300, width: 300 };

  constructor(props) {
    super(props);
    this.id = generateComponentKey("chart");
  }

  get height() {
    const elem = document.getElementById(this.id);
    if (elem) {
      return elem.clientHeight;
    } else {
      return 300;
    }
  }

  get width() {
    const elem = document.getElementById(this.id);
    if (elem) {
      return elem.clientWidth;
    } else {
      return 300;
    }
  }

  componentDidMount() {
    this.setState({
      width: this.width,
      height: this.height
    });
    window.addEventListener("resize", () => {
      this.setState({
        width: this.width,
        height: this.height
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      this.setState({
        width: this.width,
        height: this.height
      });
    });
  }

  render() {
    const { height, width } = this.state;

    return (
      <div key={this.id} id={this.id}>
        {this.props.children({ width, height })}
      </div>
    );
  }
}
