import React, { Component } from "react";
import lscache from 'lscache';
import { Card } from 'react-bootstrap';
import parse from 'html-react-parser';
import ReactAudioPlayer from 'react-audio-player';

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

	var cacheInfo = lscache.get('listEpisodeInfo');
	if (cacheInfo !== null) {
		var infoObj = cacheInfo[idPodcast].listTrack[idEpisode];
		this.printCachedInfo(infoObj);
	} else {
		this.getDataFromServer(idPodcast, idEpisode);
		
	}
  }

  printCachedInfo(infoObj) {
		if (infoObj.description != undefined) infoObj.description = parse(infoObj.description.replace("<![CDATA[", "").replace("]]>", ""));
		this.setState({objEpisode : infoObj});
		this.props.showLoading(false);
  }

  getDataFromServer(idPodcast, idEpisode) {
	fetch('https://cors.io/?https://itunes.apple.com/lookup?id=' + idPodcast)
	 .then(response => response.json())
	 .then(data => {
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
	             obj.idPod = idPodcast;
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
	               if (attr.localName === 'description'){
	               	 obj.description = attr.innerHTML;
	               }
	               if (attr.localName === 'enclosure'){
	               	 obj.podUrl = attr.attributes.url.value;
	               }
	             }

	             arrtrackInfo.push(obj);
	           }

	           var listEpisode = {};
	           if (lscache.get('listEpisodeInfo') !== null) {
	           	listEpisode = lscache.get('listEpisodeInfo');	
	           }
	           var cacheObj = {};
	           cacheObj.num = num;
	           cacheObj.listTrack = arrtrackInfo;
	           listEpisode[idPodcast] = cacheObj;

	           lscache.set('listEpisodeInfo', listEpisode, 1440);
	           var cacheInfo = lscache.get('listEpisodeInfo');
			   var infoObj = cacheInfo[idPodcast].listTrack[idEpisode];
			   this.printCachedInfo(infoObj);
	       });
	  });
  }


  render() {
  	console.log('render content episode' + this.state.objEpisode.podUrl);
  	if (this.state.objEpisode != null){
	  	return (
	  		<Card>
	  			<Card.Title>{this.state.objEpisode.title}</Card.Title>
	  			  
	  			  	{this.state.objEpisode.description}
	  			  
	  			  <ReactAudioPlayer
					  src={this.state.objEpisode.podUrl}
					  autoPlay
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