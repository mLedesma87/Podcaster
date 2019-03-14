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
    this.props.showLoading(true);
  }

  render () {
    return (
        <div>
        <Container>
          <Row>
            <Col md={3}>
            <PodcastDetail parentProps={this.props} />
            </Col>
            <Col md={9}>
            <div className="content">
               <Route exact path="/podcast/:idPodcast" render={(props)=><ListEpisode {...props} showLoading={this.props.showLoading}/>}/>
               <Route path="/podcast/:idPodcast/episode/:idEpisode" render={(props)=><ContentEpisode {...props} showLoading={this.props.showLoading}/>}/>
            </div>
            </Col>
          </Row>
         </Container>
        </div>
    );
  }
}

export default PodcastContent;