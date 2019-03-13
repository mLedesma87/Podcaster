import React, { Component } from "react";
import PodcastDetail from './PodcastDetail.js';
import ContentEpisode from './ContentEpisode.js';
import ListEpisode from './ListEpisode.js';
import {
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import './PodcastContent.css';
import { Container, Row , Col } from 'react-bootstrap';

class PodcastContent extends Component {

  componentWillMount() {
    this.props.handler();
  }

  render () {
    return (
      <Router>
        <div>
        <Container>
          <Row>
            <Col md={3}>
            <PodcastDetail state={this.props.location.state} />
            </Col>
            <Col md={9}>
            <div className="content">
               <Route exact path="/podcast/:idPodcast" render={(props)=><ListEpisode {...props} handler={this.props.handler}/>}/>
               <Route path="/podcast/:idPodcast/episode/:episodeId" component={ContentEpisode}/>
            </div>
            </Col>
          </Row>
         </Container>
        </div>
      </Router>
    );
  }
}

export default PodcastContent;