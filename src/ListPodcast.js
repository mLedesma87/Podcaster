import React, { Component } from "react";
import {
	Link
} from "react-router-dom";
import './ListPodcast.css'
import { Container, Row , Col , Image, Badge, Nav, Form, FormControl } from 'react-bootstrap';
import lscache from 'lscache';
import api from './podcastApi.js';

class ListPodcast extends Component {

  constructor() {
    super();
    this.state = {
      listPodcast : [],
      filteredList : [],
      isFiltered : false
    }
  }

  componentWillMount() {
    api.podcasts().getPodcastList(lscache)
      .then(data => {
        this.setState({listPodcast : data});
        this.props.showLoading(false);
    });
    
  }

  filterList(event){
    var updatedList = this.state.listPodcast;
    updatedList = updatedList.filter((item) => {
      return (item["im:artist"]['label'].toLowerCase().search(
        event.target.value.toLowerCase()) !== -1  || item["im:name"]['label'].toLowerCase().search(
        event.target.value.toLowerCase()) !== -1);
    });
    this.setState({filteredList: updatedList , isFiltered : true});
  }

  renderFilteredList(podcastList) {

    let groupByFour = [];
    let row = []

    podcastList.forEach((a,id) => {
      id = id + 1;
      row.push(a);
      if (id%4===0 || id / 4 >= podcastList.length / 4) {
        groupByFour.push(row);
        row = [];
      }
    });

    const col = [];

    groupByFour.forEach((rowList, index) => {
      const rowGrid = [];
      
      rowList.map((rowItem, id) => {
        rowGrid.push(
          <Col sm={3} key={id}>
           <div className="podcastCover">
             <Image src={rowItem['im:image'][1]['label']} roundedCircle ></Image>
             <div><Link to={{pathname: `/podcast/${rowItem['id']['attributes']['im:id']}`, state :{ 'podcastDetail' : id + index * 4, 'idPodcast' : rowItem['id']['attributes']['im:id']} }}>{rowItem['im:name']["label"]}</Link></div>
             <span>Author:{rowItem['im:artist']['label']}</span>
           </div>
         </Col>
        );
      })
      col.push(<Row key={index}>{rowGrid}</Row>);

    });

    return col
  }

  render() {
    const podcastList = this.state;
    
    var filteredPodcastList;
    if (this.state.isFiltered){
      filteredPodcastList = this.renderFilteredList(podcastList.filteredList);
    } else {
      filteredPodcastList = this.renderFilteredList(podcastList.listPodcast);
    }

console.log('render lsitpodcast');
    
    return (
      <Container>
        <Nav className="justify-content-end">
          <Badge pill variant="primary">{ this.state.isFiltered ? podcastList.filteredList.length : podcastList.listPodcast.length}</Badge>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.filterList.bind(this)}/>
          </Form>
        </Nav>
        {filteredPodcastList}
      </Container>
      )
  }
}
 
export default ListPodcast;