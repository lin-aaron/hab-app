import React from 'react';
import Dropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css'
import logo from './stac_logo.png';
import './App.css';

interface AppState {
  selected_flight: Option;
}
class App extends React.Component<{}, AppState> {
  constructor() {
    super({});
    this.state = {
      selected_flight: {value: '1', label:'Current Flight (Live)'}
    }
  }

  handle_flight_change = (option: Option) => {
    this.setState({selected_flight: option})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo"><img src={logo} alt="logo" /></div>
          <div className="App-title"><p>HAB Tracker</p></div>
        </header>
        <div className="App-wrapper">
        <MapPanel selected_flight = {this.state.selected_flight}  />
        <InfoPanel selected_flight = {this.state.selected_flight} handle_flight_change={this.handle_flight_change} />
        </div>
        <footer className="App-footer">Built by <a href="https://stac.berkeley.edu">Space Technologies at Cal</a>, 2019</footer>
      </div>
    );
  }
}

interface InfoPanelProps {
  selected_flight : Option;
  handle_flight_change: (option: Option) => void;
}
class InfoPanel extends React.Component<InfoPanelProps> {
  constructor(props: InfoPanelProps) {
    super(props);
  }

  options = [{value: '1', label:'Current Flight (Live)'}, {value: '2', label:'HAB III'}, {value: '3', label:'HAB II'}];

  render() {
    return (
    <div className="info-panel">
      <h3>Track flight stats</h3> 
      <Dropdown className="flight-dropdown" 
      options={this.options} 
      value={this.props.selected_flight} 
      onChange={this.props.handle_flight_change} />
    </div>
    );
  }
}

interface MapProps{
  selected_flight: Option;
}
class MapPanel extends React.Component<MapProps> {
  constructor(props: MapProps) {
    super(props);
  }

  render() {
    return (
      <div className="map-panel"><h3>Map Panel</h3>
      <p>displaying map: {this.props.selected_flight.label}</p></div>

    )
  }
}

export default App;
