import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";

const fakejoblist = [
  {
    title: "software",
    employer: "big corporation",
    date: "from 2023-2024",
  },
  {
    title: "elec",
    employer: "medium corporation",
    date: "from 2023-2024",
  },
  {
    title: "aero",
    employer: "small corporation",
    date: "from 2023-2024",
  },
  {
    title: "coen",
    employer: "bigger corporation",
    date: "from 2023-2024",
  },
  {
    title: "soen",
    employer: "biggest corporation",
    date: "from 2023-2024",
  },
];
export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }
  //test function just to show how it works
  mapfunctiontest = () => {
    console.log("maptest called");
    return fakejoblist.map(({ title, employer, date }) => {
      return (
        <div>
          {"JOB TITLE:   " +
            title +
            " EMPLOYER:   " +
            employer +
            " DATE OF INTERNSHIP:    " +
            date}
        </div>
      );
    });
  };
  render() {
    return (
      <div className="candidate-page-container">
        <div> Candidate Page</div>
        {this.mapfunctiontest()}
      </div>
    );
  }
}
