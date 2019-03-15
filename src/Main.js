import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import { Nav } from 'react-bootstrap';
import ListPodcast from './ListPodcast.js'
import PodcastContent from './PodcastContent.js'
import './Main.css';

 
class Main extends Component {
  
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
    //Bind loader state to able to change in children components
    this.handlerBind = this.showLoading.bind(this);
  }

  showLoading(flag) {
    if (flag === undefined) flag = true;
     this.setState({
      isLoading: flag
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/"><h1>Podcaster</h1></Nav.Link>
            </Nav.Item>
            <Nav.Item className="spinnerContainer">
              {this.state.isLoading ? <img alt="loader" src="/tail-spin.svg" /> : ""}
            </Nav.Item>
          </Nav>
          <hr />
          <div className="content">
            <Route exact path="/" render={(props)=><ListPodcast {...props} showLoading={this.handlerBind}/>}/>
            <Route path="/podcast/:idPodcast" render={(props)=><PodcastContent {...props} showLoading={this.handlerBind}/>}/>
          </div>
        </div>
      </Router>
    );
  }
}
 
export default Main;