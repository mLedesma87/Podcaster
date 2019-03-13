import React, { Component } from "react";
import lscache from 'lscache';
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';

class PodcastDetail extends Component {

  render () {
    var id = this.props.state.idPodcast;

    var podcastInfo = {};
    lscache.get('podcastInfo').forEach(function (itmPodcast, index){
      if (itmPodcast['id']['attributes']['im:id'] === id) {
        podcastInfo = itmPodcast;
      }
    });

    return (
         <Card>
           <Card.Img variant="top" src={podcastInfo['im:image'][2]['label']}/>
           <Card.Body>
             <Card.Title>{podcastInfo['im:name']["label"]}</Card.Title>
             <Card.Subtitle>By {podcastInfo['im:artist']["label"]} </Card.Subtitle>
           </Card.Body>
           <ListGroup className="list-group-flush">
              <Card.Title>Description</Card.Title>
             <ListGroupItem>{podcastInfo['summary']["label"]}</ListGroupItem>
           </ListGroup>
         </Card>
     );
  }
}

export default PodcastDetail;