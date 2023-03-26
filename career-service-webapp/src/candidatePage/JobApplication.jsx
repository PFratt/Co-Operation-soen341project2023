import axios from 'axios';
import React from 'react'
import ApplicationStatus from './ApplicationStatus'

export default class JobApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  sendApplication = () => {
    document.getElementById("ApplyBtn").disabled = true;
    console.log(this.props);
    const date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let newApplication = {
      date_applied: `${year}-${month}-${day}`,
      status: "pending",
      jobID: this.props.jobID,
      userID: this.props.cookies.get("userID"),
    };
    axios
      .post("https://sawongdomain.com/addapplication", newApplication, {
        headers: {
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })

      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
      //this.props.refresh();
    console.log("TESTING");
  };
  
  render() {
    return (
      <div className='JobApplicationComponent'>
          <h4>Application:</h4>
          <p>
            Status: <ApplicationStatus statusValue={this.props.status}/>
          </p>
          <p>Name: Denis</p>
          <p>Resume: RandomResume.pdf</p>
          <p>Cover Letter: CoverLetter.pdf</p>
          {this.props.status == "none" ? <button id="ApplyBtn" onClick={this.sendApplication}>Apply</button> : null}
      </div>
    )
  }
}

