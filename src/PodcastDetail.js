import React, { Component } from "react";
import lscache from 'lscache';
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';
import Loader from 'react-loader';
import {
  Link
} from "react-router-dom";
import api from './podcastApi.js';

class PodcastDetail extends Component {

  constructor() {
    super();
    this.state = {
      podcastInfo : null
    }
  }

  componentDidMount() {

    var id = this.props.parentProps.match.params.idPodcast;
    api.podcasts().getPodcastList(lscache)
      .then(data => {
          var id = this.props.parentProps.match.params.idPodcast;
          var infoPodcast = [];

          lscache.get('cachedListPodcasts').forEach((itmPodcast, index) => {
              if (itmPodcast['id']['attributes']['im:id'] === id) {
                infoPodcast = itmPodcast;
              }
            });
          this.setState({podcastInfo : infoPodcast});
      });
  }

  render () {
    var podcastInfo = this.state.podcastInfo;

    if (podcastInfo != null) {
      return (
        <Card>
             <Link to={{pathname: `/podcast/${podcastInfo['id']['attributes']['im:id']}`}}>
               <Card.Img variant="top" src={podcastInfo['im:image'][2]['label']}/>   
             </Link>             
             <Card.Body>
               <Link to={{pathname: `/podcast/${podcastInfo['id']['attributes']['im:id']}`}}>
                 <Card.Title>{podcastInfo['im:name']["label"]}</Card.Title>
               </Link>
               <Link to={{pathname: `/podcast/${podcastInfo['id']['attributes']['im:id']}`}}>
                 <Card.Subtitle>By {podcastInfo['im:artist']["label"]} </Card.Subtitle>
               </Link>
             </Card.Body>
             <ListGroup className="list-group-flush">
                <Card.Title>Description</Card.Title>
               <ListGroupItem>{podcastInfo['summary']["label"]}</ListGroupItem>
             </ListGroup>
           </Card>
        )
    } else {
      return (
           ""
       );
    }
  }
}

export default PodcastDetail;