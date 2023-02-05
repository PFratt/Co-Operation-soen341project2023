import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";

export default class MyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  render() {
    return <div className="myjobs-page-container">my jobs</div>;
  }
}
