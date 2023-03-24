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
    let newApplication = {
      date_applied: "12",
      status: "pending",
      jobID: this.props.cookies.get("JobID"),
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
      })
      .catch(function (error) {
        console.log(error);
      });
      
    console.log("TESTING");
  };
  
  render() {
    const { status } = this.props;
    return (
      <div className='JobApplicationComponent'>
          <h4>Application:</h4>
          <p>
            Status: <ApplicationStatus statusValue={status}/>
          </p>
          <p>Name: Denis</p>
          <p>Resume: RandomResume.pdf</p>
          <p>Cover Letter: CoverLetter.pdf</p>
          {status === "none" ? <button onClick={this.sendApplication}>Apply</button> : null}
      </div>
    )
  }
}

