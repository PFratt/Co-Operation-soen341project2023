import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";

export default class Applicants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  render() {
    return <div className="applicants-page-container">applicants list</div>;
  }
}
