export default {

podcasts() {
    return {
      getPodcastList: (lscache) => {

      	var cachedListPodcasts = lscache.get('cachedListPodcasts');
      	if (cachedListPodcasts === null) {
      		return fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        	.then(response => response.json()).then(data =>{
        		return new Promise((resolve) => {
		  	        lscache.set('cachedListPodcasts', data.feed.entry, 1440);
		  	        resolve(data.feed.entry);
			      });
        	})
      	} else {
      		return new Promise((resolve) => {
        	  resolve(cachedListPodcasts);
	      	});
      	}
      },
      getEpisodesList : (lscache , idPodcast) => {
      	
      	var cacheInfo = lscache.get('listEpisodeInfo');
      	if (cacheInfo != null && cacheInfo[idPodcast] != undefined) {
      		return new Promise((resolve) => {
        	  resolve(cacheInfo[idPodcast]);
	      	});
      	} else {
      		return fetch('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=' + idPodcast)
	        	.then(response => response.json()).then(data =>{
	        		var numTracks = data.results[0].trackCount;
	        		return fetch('https://cors-anywhere.herokuapp.com/' + data.results[0].feedUrl)
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
			                 if (attr.innerHTML.indexOf(':') > -1){
			                 	obj.duration = attr.innerHTML;
			                 } else {
		                 	    var measuredTime = new Date(null);
							    measuredTime.setSeconds(parseInt(attr.innerHTML)); // specify value of SECONDS
							    var MHSTime = measuredTime.toISOString().substr(11, 8);
			                 	obj.duration = MHSTime;
			                 }
			                 
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
			           cacheObj.num = numTracks;
			           cacheObj.listTrack = arrtrackInfo;
			           listEpisode[idPodcast] = cacheObj;

			           lscache.set('listEpisodeInfo', listEpisode, 1440);
	                   return new Promise((resolve) => {
			  	       	resolve(cacheObj);
				       });
		       });

        	})
      	}
      }
    }
  }
}