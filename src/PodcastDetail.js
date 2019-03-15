import React, { Component } from "react";
import lscache from 'lscache';
import { Card } from 'react-bootstrap';
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
    //Call the api and get the info
    api.podcasts().getPodcastList(lscache)
      .then(data => {
          var id = this.props.parentProps.match.params.idPodcast;
          var infoPodcast = [];

          //get detail from cached object
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
    //Render information if there is any
    if (podcastInfo != null) {
      return (
        <Card>
           <Link to={{pathname: `/podcast/${podcastInfo['id']['attributes']['im:id']}`}}>
             <Card.Img variant="top" src={podcastInfo['im:image'][2]['label']}/>   
           </Link>
           <Card.Body>
               <hr />
                 <Link to={{pathname: `/podcast/${podcastInfo['id']['attributes']['im:id']}`}}>
                   <Card.Title>{podcastInfo['im:name']["label"]}</Card.Title>
                 </Link>
                 <Link to={{pathname: `/podcast/${podcastInfo['id']['attributes']['im:id']}`}}>
                   <Card.Subtitle><em> by {podcastInfo['im:artist']["label"]} </em></Card.Subtitle>
                 </Link>
            </Card.Body>
            <hr />
            <Card.Title>Description:</Card.Title>
            <em><Card.Text>{podcastInfo['summary']["label"]}</Card.Text></em>
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