import React, { Component } from "react";
import {
	Link
} from "react-router-dom";
import './ListPodcast.css'
import { Container, Row , Col , Image } from 'react-bootstrap';
import lscache from 'lscache';

class ListPodcast extends Component {

  constructor() {
    super();
    this.state = {
      podcastInfo : null,
      listPodcast : []
    }
  }

  componentDidMount() {

    var podcastInfo = lscache.get('podcastInfo');
    if (podcastInfo) {
      this.setState({listPodcast : podcastInfo});
    } else {
      fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(response => response.json())
        .then(data => {
          this.setState({listPodcast : data.feed.entry});
          lscache.set('podcastInfo', data.feed.entry, 1440);
      });
    }
  }

  render() {

  	const podcastList = this.state;
    var arrPodcast = [];
    var arrRow = [];

  	podcastList.listPodcast.map(function(d, idx){
      idx = idx +1;
      arrRow.push(d);
      if (idx%4 === 0) {
        arrPodcast.push(arrRow);
        arrRow = [];
      }
	  });

    const finalPodcastList = arrPodcast.map(function(a,id){
         return ([
            <Row key={id}>
              {a.map(function(i, idi){
                 return (<Col sm={3} key={idi}>
                   <div className="podcastCover">
                     <Image src={i['im:image'][1]['label']} roundedCircle ></Image>
                     <div><Link to={{pathname: `/podcast/${i['id']['attributes']['im:id']}`, state :{ 'podcastDetail' : 4 * id + idi, 'idPodcast' : i['id']['attributes']['im:id']} }}>{i['im:name']["label"]}</Link></div>
                     <span>Author:{i['im:artist']['label']}</span>
                   </div>
                 </Col>)                 
              })}
            </Row>
        ])
    })
    return <Container>{finalPodcastList}</Container>
  }
}
 
export default ListPodcast;