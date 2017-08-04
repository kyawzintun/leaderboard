import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true,
      activeRecent: true,
      activeAllTime: false
    }

    this.sortByRecent = this.sortByRecent.bind(this);
    this.sortByAllTime = this.sortByAllTime.bind(this);
  }

  componentDidMount(){
    let recentApi = baseUrl + 'recent';
    this.callApi(recentApi);
  }

  sortByRecent() {
    this.setState({activeRecent: true,activeAllTime: false})
    let recentApi = baseUrl + 'recent';
    this.callApi(recentApi);
  }

  sortByAllTime() {
    this.setState({activeRecent: false,activeAllTime: true})
    let recentApi = baseUrl + 'alltime';
    this.callApi(recentApi);
  }

  callApi(url) {
    let _this = this;
    fetch(url)
    .then(function(res){
      return res.json();
    })
    .then(function(data){
      _this.setState({data: data, loading: false}, () => (console.log(_this.state)));
    })
  }

  render() {
    let content;
    if(this.state.loading === false){
      let users = this.state.data;
      content = users.map((user,index) =>
        <tr key={index}>
          <td>{index+1}</td>
          <td><img src={user.img} className="img-thumbnail" alt="Cinque Terre" width="50" height="25" /> {user.username}</td>
          <td>{user.recent}</td>
          <td>{user.alltime}</td>
        </tr>
      );
    }
    return (
      <div className="container">
        <div className="row user-list-row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan="4" className="table-title">Leader Board</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th className={"sort " + (this.state.activeRecent ? 'active-recent': '')} onClick={this.sortByRecent}>Points in past 30 days	<i className="fa fa-sort"></i></th>
                <th className={"sort " + (this.state.activeAllTime ? 'active-all-time': '')} onClick={this.sortByAllTime}>All time points <i className="fa fa-sort"></i></th>
              </tr>
            </thead>
            <tbody>
              {content}
            </tbody>
          </table>
        </div>
        <div className="row">
          <nav className="navbar navbar-inverse navbar-fixed-bottom">
            <div className="container-fluid">
              <p className="coded-by">*** By <a href="https://www.linkedin.com/in/kyawzintun/" target="_blank">KZT</a> ***</p>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const baseUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/';
export default App;
