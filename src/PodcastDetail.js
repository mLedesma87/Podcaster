import React, { Component } from "react";
import lscache from 'lscache';
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';
import { XMLParser } from 'react-xml-parser';
import {
  Link
} from "react-router-dom";

class PodcastDetail extends Component {

  constructor() {
    super();
    this.state = {
      trackCount : 0,
      trackInfo : []
    }
  }

  componentWillMount() {
    this.setState({podcastDetail : this.props.state.podcastDetail});   
  }

  render () {
    console.log('render');    
    var podcastInfo = lscache.get('podcastInfo')[this.state.podcastDetail];

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