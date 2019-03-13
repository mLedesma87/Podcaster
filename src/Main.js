import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import { Nav } from 'react-bootstrap';
import ListPodcast from './ListPodcast.js'
import PodcastContent from './PodcastContent.js'
import Loader from 'react-loader';
 
class Main extends Component {
  
  constructor() {
    super();
    this.state = {
      isLoading: true
    }
    
    this.handlerBind = this.handler.bind(this);
  }

  handler(flag) {
    
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
            <Nav.Item>
              {this.state.isLoading ? <Loader lines={13} length={20} width={5} radius={10}
                corners={1} className="spinner" /> : ""}
            </Nav.Item>
          </Nav>
          <hr/>
          <div className="content">
            <Route exact path="/" render={(props)=><ListPodcast {...props} handler={this.handlerBind}/>}/>
            <Route path="/podcast/:idPodcast" render={(props)=><PodcastContent {...props} handler={this.handlerBind}/>}/>
          </div>
        </div>
      </Router>
    );
  }
}
 
export default Main;