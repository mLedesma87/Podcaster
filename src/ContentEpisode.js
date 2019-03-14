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
  		objEpisode : {}
  	}
  }

  componentDidMount() {
  	var idPodcast = this.props.match.params.idPodcast;
  	var idEpisode = this.props.match.params.idEpisode;

	this.props.showLoading(true);
  	api.podcasts().getEpisodesList(lscache, idPodcast).then((infoObj) => {
       	infoObj = infoObj.listTrack[idEpisode];
   		if (infoObj.description != undefined) {
			if (infoObj.description.indexOf("<![CDATA[") != -1) {
				infoObj.description = parse(infoObj.description.replace("<![CDATA[", "").replace("]]>", ""));
			} else {
				infoObj.description = decodeURI(infoObj.description);
			}
		}
       this.setState({objEpisode : infoObj});
       this.props.showLoading(false);
	});
  }

  render() {
  	if (this.state.objEpisode != null){
	  	return (
	  		<Card>
	  			<Card.Title><h1>{this.state.objEpisode.title}</h1></Card.Title>
	  			  {this.state.objEpisode.description}
	  			  <ReactAudioPlayer
					  src={this.state.objEpisode.podUrl}
					  controls
					/>
	  		</Card>
	  	)
  	} else {
  		return ("")
  	}
  }
}
 
export default ContentEpisode;