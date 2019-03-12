import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import ListPodcast from './ListPodcast.js'
import PodcastContent from './PodcastContent.js'
 
class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Podcaster</h1>
          <hr/>
          <div className="content">
            <Route exact path="/" component={ListPodcast}/>
            <Route path="/podcast/:idPodcast" component={PodcastContent}/>
          </div>
        </div>
      </Router>
    );
  }
}
 
export default Main;