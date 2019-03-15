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
      filteredListRendered : [],
      filteredList : [],
      isFiltered : false
    }
  }

  componentDidMount() {
    //get podcast list from api
    api.podcasts().getPodcastList(lscache)
      .then(data => {
        this.setState({listPodcast : data});
        this.renderFilteredList(data)
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
    this.setState({isFiltered : true});
    this.renderFilteredList(updatedList);
  }

  renderFilteredList(podcastList) {

    let groupByFour = [];
    let row = []

    //Group podcast to show a row every 4 podcast card
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
      
      rowList.forEach((rowItem, id) => {
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
    //Render list and keep a copy of the objects in the state variable
    this.setState({filteredListRendered : col, filteredList : podcastList});
    return col
  }

  render() {
    const podcastList = this.state;
    return (
      <Container>
        <Nav className="justify-content-end">
          <Badge pill variant="primary">{ podcastList.isFiltered ? podcastList.filteredList.length : podcastList.listPodcast.length}</Badge>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.filterList.bind(this)}/>
          </Form>
        </Nav>
        {podcastList.filteredListRendered}
      </Container>
      )
  }
}
 
export default ListPodcast;