import React, { Component } from "react";
import {
	Link
} from "react-router-dom";
import './ListPodcast.css'
import { Container, Row , Col , Image } from 'react-bootstrap';
import lscache from 'lscache';

class ContentEpisode extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
  	return <h1>Content Episode</h1>;
  }
}
 
export default ContentEpisode;