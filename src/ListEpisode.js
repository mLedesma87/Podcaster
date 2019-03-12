import React, { Component } from "react";
import {
	Link
} from "react-router-dom";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class ListEpisode extends Component {

  constructor() {
    super();
    this.state = {
    	podId : 0,
    	trackCount : 0,
    	trackInfo : []
    }
  }

  componentDidMount() {
  	this.setState({podId : this.props.location.state.idPodcast});
  	
  	fetch('https://cors.io/?https://itunes.apple.com/lookup?id=' + this.props.location.state.idPodcast)
     .then(response => response.json())
     .then(data => {
     	console.log(data);
     	this.setState({trackCount : data.results[0].trackCount});

        fetch('https://cors.io/?' + data.results[0].feedUrl)
         .then(response => response.text())
         .then(data => {
           var oParser = new DOMParser();
           var oDOM = oParser.parseFromString(data, "application/xml");

           var arrtrackInfo = [];
           var arrPodcast = oDOM.documentElement.getElementsByTagName('item');
           for (var item of arrPodcast) {
             var obj = {};
             for (var attr of item.children) {
               if (attr.localName === 'title') {
                 obj.title = attr.innerHTML;
               }
               if (attr.localName === 'pubDate') {
                 obj.pubDate = attr.innerHTML;
               }
               if (attr.localName === 'duration') {
                 obj.duration = attr.innerHTML;
               }
             }
             arrtrackInfo.push(obj);
           }

           this.setState({trackInfo : arrtrackInfo});
       });
     });
  }

  render() {

    const lista = this.state.trackInfo.map(function(obj, index){
      return [(
         <Link to={{pathname: '/podcast/123/episode/245'}}><li key={index}>{obj.title}{obj.pubDate}{obj.duration}</li></Link>
      )]
    });

  	return (
  		<div>
 			<ListGroup>
			  <ListGroup.Item><h1>Episodes: {this.state.trackCount}</h1></ListGroup.Item>
			</ListGroup>
  			<ul>{lista}</ul>
  		</div>
  	);
  }
}
 
export default ListEpisode;