import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  
	constructor(props) {
		super(props);
		this.state = ({
				center: {
					      lat: 51.488989,
					      lng: 0.283632					     
						},
				zoom: 11,
				showVan: false,
				showLakeside: false,
				showRomford: false,
				elementId: this.props.elementId
		});
		this.closeMapRollOver = this.closeMapRollOver.bind(this);
		
	
	}

	loadMapRollOver() {
		this.setState({showVan: true});				
	}

	closeMapRollOver() {
		this.setState({showVan: false});				
	}

	

	loadMapRollOverWarning() {
		this.setState({showLakeside: true});				
	}

	loadMapRollOverDanger() {
		this.setState({showRomford: true});				
	}
 
  render() {
    return (
			//parent DIV must have a width and height
			//Notice in the MapRollOver component call I am passing a function via props to the child so it can action a function in the parent component.
			//The function I pass allows me to modify state in the parent component SimpleMap
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "Insert your Google Maps JavaScript API key here" }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
	      	<span lat={51.488989} lng={0.283632} className="sticker sticker-large sticker-warning" onClick={() => this.loadMapRollOverWarning()}>
		        <span lat={51.488989} lng={0.283632}  aria-hidden="true" className="icon-dashboard" >
		        </span>
		    	</span>
					{this.state.showLakeside ? <MapRollOverWarning lat={51.488989} lng={0.283632} messageProp="Lakeside: 33% of ping tests failed" messageType = "warning"/> : null}
		    	<span lat={51.439693} lng={0.271143} className="sticker sticker-large sticker-success">
	        	<span lat={51.439693} lng={0.271143}  aria-hidden="true" className="icon-dashboard">
	        	</span>	        
	        </span>
	        <span lat={51.579756} lng={0.178148} className="sticker sticker-large sticker-danger" onClick={() => this.loadMapRollOverDanger()}>
	        	<span lat={51.579756} lng={0.178148}  aria-hidden="true" className="icon-dashboard">
	        	</span>	        
	        </span>
					{this.state.showRomford ? <MapRollOverDanger lat={51.579756} lng={0.178148} messageProp="Canary: Currently down: Reported" messageType = "danger"/> : null}
					<span lat={51.622269} lng={0.226304} className="sticker sticker-large sticker-info" onClick={() => this.loadMapRollOver()} >
						<span lat={51.622269} lng={0.226304}  aria-hidden="true" className="icon-truck">
						</span>
					</span>
					
					{this.state.showVan ? <MapRollOver action={this.closeMapRollOver} lat={51.622269} lng={0.226304} messageProp="On route to Canary - Susan Watt" messageType = "info"/> : null}	 
				</GoogleMapReact >
      </div>
    );
  }
}


class MapRollOver extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div style={{marginTop: '50px', maxWidth: '200px', minWidth:'200px'}} onClick={this.props.action} className={"label label-" + this.props.messageType}>{this.props.messageProp}</div>
		);
	}
	
}

class MapRollOverWarning extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div style={{marginTop: '50px', maxWidth: '200px', minWidth:'200px'}} className={"label label-" + this.props.messageType}>{this.props.messageProp}</div>
		);
	}
	
}

class MapRollOverDanger extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div style={{marginTop: '50px', maxWidth: '200px', minWidth:'200px'}} className={"label label-" + this.props.messageType}>{this.props.messageProp}</div>
		);
	}
	
}
export default function(elementId) {
	ReactDOM.render(<SimpleMap />, document.getElementById(elementId));
}