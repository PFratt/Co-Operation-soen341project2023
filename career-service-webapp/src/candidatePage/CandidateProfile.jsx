import * as React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "@fluentui/react/lib/Icon";
import "./css/Candidate.css";
import axios from "axios";

export default class CandidateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      selectedJob: null,
      name: "",
      newName: "",
      lastName: "",
      newLastName: "",
      email: "",
      newEmail: "",
      headline: "",
      newHeadline: "",
      description: "",
      newDescription: "",
      showName: "none",
      showLast: "none",
      showEmail: "none",
      showHeadline: "none",
      showDescription: "none",
      isEdit: false,

      profiles: [],
      profilesCollected: false,
      users: [],
      usersCollected: false,
      profileExists: false,
    };

    setTimeout(() => {
      this.getAPI();
      this.getUsersAPI();
    })

    setTimeout(() => {
      this.check();
      this.getNameAPI();
    },150)

  }

  // First Name
  showEditBoxName() {
    this.setState({ showName: "block" });
  }

  hideEditBoxName() {
    this.setState({ showName: "none" });
  }

  readTextBoxName = (userInputName) => {
    this.setState({ newName: userInputName.target.value });
    //console.log(userInputName.target.value);
    //console.log(this.state.newName);
  };

  saveName() {
    this.setState({ name: this.state.newName });
    //console.log("New name is: ", this.state.name);
    //this.setState({showName: 'none'});
  }

  // Last Name
  showEditBoxLast() {
    this.setState({ showLast: "block" });
  }

  hideEditBoxLast() {
    this.setState({ showLast: "none" });
  }

  readTextBoxLast = (userInputLast) => {
    this.setState({ newLastName: userInputLast.target.value });
    //console.log(userInputLast.target.value);
    //console.log(this.state.newLastName);
  };

  saveLastName() {
    this.setState({ lastName: this.state.newLastName });
    //console.log("New last name is: ", this.state.lastName);
    //this.setState({showLast: 'none'});
  }

  // Email
  showEditBoxEmail() {
    this.setState({ showEmail: "block" });
  }

  hideEditBoxEmail() {
    this.setState({ showEmail: "none" });
  }

  readTextBoxEmail = (userInputEmail) => {
    this.setState({ newEmail: userInputEmail.target.value });
    //console.log(userInputEmail.target.value);
    //console.log(this.state.newEmail);
  };

  saveEmail() {
    this.setState({ email: this.state.newEmail });
    //this.setState({showEmail: 'none'});
  }

  // Headline
  showEditBoxHeadline() {
    this.setState({ showHeadline: "block" });
  }

  hideEditBoxHeadline() {
    this.setState({ showHeadline: "none" });
  }

  readTextBoxHeadline = (userInputHeadline) => {
    this.setState({ newHeadline: userInputHeadline.target.value });
    //console.log(userInputHeadline.target.value);
    //console.log(this.state.newHeadline);
  };

  saveHeadline  () {
    this.setState({ headline: this.state.newHeadline });
    //this.setState({showHeadline: 'none'});
  }

  // Descriptioon
  showEditBoxDescription() {
    this.setState({ showDescription: "block" });
  }

  hideEditBoxDescription() {
    this.setState({ showDescription: "none" });
  }

  readTextBoxDescription = (userInputDescription) => {
    this.setState({ newDescription: userInputDescription.target.value });
    //console.log(userInputDescription.target.value);
    //console.log(this.state.newDescription);
  };

  saveDescription() {
    this.setState({ description: this.state.newDescription });
    //this.setState({show6: 'none'});
  }

  showEditBoxes() {
    //this.showEditBoxName();
    //this.showEditBoxLast();
    //this.showEditBoxEmail();
    this.showEditBoxHeadline();
    this.showEditBoxDescription();
    this.setState({ isEdit: true });
  }

  hideEditBoxes() {
    this.hideEditBoxName();
    this.hideEditBoxLast();
    this.hideEditBoxEmail();
    this.hideEditBoxHeadline();
    this.hideEditBoxDescription();
    this.setState({ isEdit: false });
  }

  saveBoxes() {
    // if (document.getElementById("fullName").value.trim() != "") {
    //   this.saveName();
    // }

    // if (document.getElementById("eMail").value.trim() != "") {
    //   this.saveEmail();
    // }

    if (document.getElementById("headLine").value.trim() != "") {
      this.saveHeadline();
    }

    if (document.getElementById("CV").value.trim() != "") {
      this.saveDescription();
    }
    
    setTimeout(() => {
      console.log("NEW SAVED HEADLINE IS : ");
      console.log(this.state.headline);
      console.log("NEW SAVED DESCRIPTION IS : " + this.state.description);
    },500)

    this.hideEditBoxes();

    console.log("Boxes Saved")
  }

  editAPI = () => {
    let data = {
      //userID: this.props.cookies.get("userID"),
      headline: this.state.headline,
      description: this.state.description
    };
    axios
      .patch(
        `https://sawongdomain.com/modifyprofile/${this.props.cookies.get("userID")}`,
        data,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editAPIButton = () => {
    this.saveBoxes();
    setTimeout(() => {
      this.editAPI();
    },1)
    this.setState({ isEdit: false });
  }

  sendAPI = () => {
    console.log("sendAPI was called")
    let data = {
      userID: this.props.cookies.get("userID"),
      headline: this.state.headline,
      description: this.state.description
    };
    axios
      .post(
        `https://sawongdomain.com/addprofile`,
        data,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({ profileExists: true });
        setTimeout(() => {
          window.location.reload();
        },500)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  createProfile = () => {
    this.saveBoxes();
    setTimeout(() => {
      this.sendAPI();
    },500)
  }

  getAPI = () => {
    //ask sam
    axios
      .get(`https://sawongdomain.com/profiles/`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ profiles: response.data });
        this.setState({ profilesCollected: true });
        //console.log("getAPI() has ran TEST")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getUsersAPI = () => {
    //ask sam
    axios
      .get(`https://sawongdomain.com/users/`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ users: response.data });
        this.setState({ usersCollected: true });
        //console.log("getUsersAPI() has ran TEST")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  check = () => {
    console.log("check");
    //this for loop displays target user
    for(let x = 0; x < this.state.users.length; x++){
      if(parseInt(this.state.users[x]) == parseInt(this.props.cookies.get("userID"))){
        console.log("this is the target user");
        console.log(this.state.users[x]);
        break;
      }
    }

    for (let i = 0; i < this.state.profiles.length; i++) {
      console.log("for loop")
      if (parseInt(this.state.profiles[i].userID) == parseInt(this.props.cookies.get("userID"))){
        console.log("this is the target user's profile");
        console.log(this.state.profiles[i]);
        this.setState({ profileExists: true });
        
        setTimeout(() => {
          if (this.state.profileExists == true){
            this.setState({ headline: this.state.profiles[i].headline });
            this.setState({ description: this.state.profiles[i].description });
          }
        },1)
      }
    }
  };

  componentDidMount() {
    setTimeout(() => {
      if(this.state.profileExists == false){
        this.showEditBoxes();
        //displays big red box saying you need a profile to apply and have employers see you.
      }
    },2000)
  }

  getNameAPI = () => {
    //console.log("getNameAPI() ran")
    for(let i = 0; i < this.state.users.length; i++){
      //console.log("for getNameAPI ran")
      if(parseInt(this.state.users[i].id) == parseInt(this.props.cookies.get("userID"))){
        console.log("TESTING This is the name and email of the user signed in:");
        console.log(this.state.users[i].name);
        console.log(this.state.users[i].email);
        this.setState({ name: this.state.users[i].name });
        this.setState({ email: this.state.users[i].email });
        break;
      }
    }
  }

  render() {
    return (
      <div
        className="candidate-profile-container"
        style={{
          backgroundColor: "grey",
          maxWidth: 400,
          textAlign: "left",
          padding: 20,
          marginTop: 30,
        }}
      >
        {console.log(this.state.profileExists)}
        <div className="candidate-profile-wrapper">
          {this.state.profileExists ? null : 
            <p style={{borderWidth: 3, borderColor: 'red', color: 'red'}}>!IMPORTANT! <br/> Please Create your Candidate Profile below before proceeding.</p>}
          Candidate Profile
          <br />

          <br />
          {/* Full Name */}
          <div>
            Full Name: {this.state.name}
          </div>
          <div style={{ display: this.state.showName }}>
            <input type="text" id="fullName" onChange={this.readTextBoxName} />
          </div>

          <br />
          {/* Email */}
          <div>
            E-mail: {this.state.email}
          </div>
          <div style={{ display: this.state.showEmail }}>
            <input type="text" id="eMail" onChange={this.readTextBoxEmail} />
          </div>
          
          <br />
          {/* Headline */}
          <div>
            Headline: {this.state.headline}
          </div>
          <div style={{ display: this.state.showHeadline }}>
            <input type="text" id="headLine" onChange={this.readTextBoxHeadline} />
          </div>

          <br />
          {/* Description */}
          <div>Description: {this.state.description}</div>
          <div style={{ display: this.state.showDescription }}>
            <textarea type="text" id="CV" onChange={this.readTextBoxDescription} />
            <br />
            <br />
            {this.state.profileExists ? <button onClick={() => this.editAPIButton()}>Save</button> : null}
            {this.state.profileExists ? <button onClick={() => this.hideEditBoxes()}>Cancel</button> : null}
          </div>
          <br />

          {this.state.profileExists ? null : <button onClick={this.createProfile}>Create Profile</button>}
          {this.state.profileExists ? this.state.isEdit ? null : <button onClick={() => this.showEditBoxes()}>Edit</button> : null}
          

          <br />
        </div>
      </div>
    );
  }
}
