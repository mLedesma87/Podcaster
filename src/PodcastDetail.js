import React, { Component } from "react";
import lscache from 'lscache';
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';
import Loader from 'react-loader';
import {
  Link
} from "react-router-dom";

class PodcastDetail extends Component {

  constructor() {
    super();
    this.state = {
      podcastInfo : null
    }
  }


  componentDidMount() {
    console.log('did mount');
    var id = this.props.parentProps.match.params.idPodcast;
 
    if (lscache.get('podcastInfo') == null) { 
      fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(response => response.json())
        .then(data => {
          lscache.set('podcastInfo', data.feed.entry, 1440);
          this.getDataFromCache();
      });
    } else {
      this.getDataFromCache();
    }
  }

  getDataFromCache() {
    var id = this.props.parentProps.match.params.idPodcast;
    var infoPodcast = [];

    lscache.get('podcastInfo').forEach(function (itmPodcast, index){
        if (itmPodcast['id']['attributes']['im:id'] === id) {
          infoPodcast = itmPodcast;
        }
        console.log('get cache');
      });
      console.log(infoPodcast);
      console.log('this ' + this);
      this.setState({podcastInfo : infoPodcast});
  }

  render () {
    var podcastInfo = this.state.podcastInfo;
    console.log('render podcast detail');
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