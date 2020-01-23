import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'bootswatch/dist/solar/bootstrap.min.css'; 
import Data from './components/Table'
import "./App.css";
import { Table } from 'react-bootstrap'
import firebase from 'firebase'

var database = null;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visibleData: []
    };
  }

  setData = async () => {
    let data = await this.getFirebaseData();
    console.log(data)
    this.setState({visibleData: data });
    this.setState({data: data});
  }

  getFirebaseData = async () => {
    let result = []
    await firebase
    .database()
    .ref("Testo/")
    .once("value")
    .then(async function (snapshot) {
        snapshot = snapshot.val();
        for (var x in snapshot) {
          result.push(snapshot[x]);
          window.result = result;
        }
        console.log(result)
      });
    return result;
  }

  componentDidMount() {
    var app = firebase.initializeApp({
      apiKey: "AIzaSyA-u_frYotDqet6gv_w56OUpf6BkcaPdTQ",
      authDomain: "automator-db.firebaseapp.com",
      databaseURL: "https://automator-db.firebaseio.com",
      storageBucket: "automator-db.appspot.com"
    });
    database = firebase.database();
    console.log(app);
    this.setData();
  }

  searchName = (event) => {

    if (event.target.value == "") {
      this.setState({visibleData: this.state.data});
    }

    else {
      let c = Array.from(event.target.value);
      console.log(c);
      let searchResult = this.state.data.filter((b) => {
          if(b.name.search(event.target.value) != -1)
            return b;
          else {
            return;
          }
        }
      );
      this.setState({visibleData: searchResult})
    }
    console.log(this.state.visibleData)
  }

    render() {
      let output;
      output = this.state.visibleData.map(e => <Data names={e} data={this.state.data}></Data>)
    return (
      <div className="container pt-5 text-center">
        <input className="form-control w-25 mb-1" type="text" id="myInput" onChange={this.searchName} placeholder="Search for names"/>
        <Table condensed bordered hover style={{userSelect: "none"}}>
          <thead className="table-active">
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Family Number</th>
                  <th>Office</th>
                  <th>Id</th>
                  <th>Date</th>
              </tr> 
          </thead>
          <tbody>
              {output}
          </tbody>
        </Table>
      </div>
    );
  }
}
