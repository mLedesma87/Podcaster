import React, { Component } from "react";
import {
	Link
} from "react-router-dom";
import { ListGroup, Table } from 'react-bootstrap';
import lscache from 'lscache';
import api from './podcastApi.js';
import './ListEpisode.css';

class ListEpisode extends Component {

  constructor() {
    super();
    this.state = {
    	trackInfo : null
    }
  }

  componentDidMount() {

  	this.props.showLoading(true);
  	var idPodcast = this.props.match.params.idPodcast;
  	
  	api.podcasts().getEpisodesList(lscache, idPodcast).then((data) => {
       //get episodeslist and render
       this.setState({trackInfo : data});
       this.props.showLoading(false);
	});
  }

  render() {
  	var trackInfo = this.state.trackInfo;
  	if (trackInfo != null) {
  		//Render a row for every object
	    const lista = trackInfo.listTrack.map((obj, index) => {
	      return [(
	      	<tr key={index}>
	      		<td><Link key={index} to={{pathname: `/podcast/${obj.idPod}/episode/${index}`}}>
	  				{obj.title}
	  			</Link></td>
	  			<td>{new Date(obj.pubDate).toLocaleDateString()}</td>
	  			<td>{obj.duration}</td>
	      	</tr>
	      )]
	    });

	  	return (
	  		<div>
	 			<ListGroup>
				  <ListGroup.Item><h1>Episodes: {trackInfo.num}</h1></ListGroup.Item>
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
  	} else {
  		return ""
  	}
  }
}
 
export default ListEpisode;