import React, { Component } from "react";
import {
	Link
} from "react-router-dom";
import { ListGroup, Table } from 'react-bootstrap';
import lscache from 'lscache';

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
  	this.props.handler(true);
  	var idPodcast = this.props.location.state.idPodcast;

  	var cacheInfo = lscache.get('listEpisodeInfo');
 	if (cacheInfo === null) {
 		this.getDataFromServer(idPodcast);
 	} else if (cacheInfo[idPodcast] === undefined) {
 		this.getDataFromServer(idPodcast);
 	} else {
 		var cacheInfoObj = cacheInfo[idPodcast];	
 		console.log(cacheInfoObj);
 		this.setState({trackInfo : cacheInfoObj.listTrack});
 		this.setState({trackCount : cacheInfoObj.num});
 		this.props.handler(false);
 	}
  }

  getDataFromServer(idPodcast) {
	fetch('https://cors.io/?https://itunes.apple.com/lookup?id=' + idPodcast)
	 .then(response => response.json())
	 .then(data => {
	 	this.setState({trackCount : data.results[0].trackCount});
	 	var num = data.results[0].trackCount;

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

	           var listEpisode = {};
	           if (lscache.get('listEpisodeInfo') != undefined) {
	           	listEpisode = lscache.get('listEpisodeInfo');	
	           }
	           var obj = {};
	           obj.num = num;
	           obj.listTrack = arrtrackInfo;
	           listEpisode[idPodcast] = obj;

	           lscache.set('listEpisodeInfo', listEpisode, 1440);

	           this.setState({trackInfo : arrtrackInfo});
	           this.props.handler(false);
	       });
	  });
  }

  render() {

    const lista = this.state.trackInfo.map(function(obj, index){
      return [(
      	<tr>
      		<Link key={index} to={{pathname: '/podcast/123/episode/245'}}>
  				<td>{obj.title}</td>
  			</Link>
  			<td>{obj.pubDate}</td>
  			<td>{obj.duration}</td>
      	</tr>
      )]
    });

  	return (
  		<div>
 			<ListGroup>
			  <ListGroup.Item><h1>Episodes: {this.state.trackCount}</h1></ListGroup.Item>
			</ListGroup>
			<ListGroup>
				<ListGroup.Item>
					<Table striped responsive>
						<thead>
							<tr>
								<th>Title</th>
								<th>Date</th>
								<th>Duration</th>
							</tr>
						</thead>
						<tbody>
							{lista}	
						</tbody>
					</Table>
				</ListGroup.Item>
			</ListGroup>  			
  		</div>
  	);
  }
}
 
export default ListEpisode;