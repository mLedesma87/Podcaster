import React, { Component } from "react";
import lscache from 'lscache';
import { Card } from 'react-bootstrap';
import parse from 'html-react-parser';
import ReactAudioPlayer from 'react-audio-player';
import api from './podcastApi.js';

class ContentEpisode extends Component {

  constructor() {
  	super();
  	this.state = {
  		objEpisode : {
  			title : "",
  			podUrl : ""
  		}
  	}
  }

  componentDidMount() {
  	var idPodcast = this.props.match.params.idPodcast;
  	var idEpisode = this.props.match.params.idEpisode;

	this.props.showLoading(true);
  	api.podcasts().getEpisodesList(lscache, idPodcast).then((infoObj) => {
  		//Get episode content and parse description to be able to show HTML code
       	infoObj = infoObj.listTrack[idEpisode];
   		if (infoObj.description !== undefined) {
			infoObj.description = parse(infoObj.description.replace("<![CDATA[", "").replace("]]>", ""));
		}
       this.setState({objEpisode : infoObj});
       this.props.showLoading(false);
	});
  }

  render() {
  	var objEpisode = this.state.objEpisode;
  	return (
  		<Card className="episodeContent">
  			<Card.Title><h1>{objEpisode.title}</h1></Card.Title>
  			  <div className="cardText" >{objEpisode.description}</div>
  			  <div className="cardText" ><ReactAudioPlayer
				  src={objEpisode.podUrl}
				  controls
				/></div>
  		</Card>
  	)
  }
}
 
export default ContentEpisode;