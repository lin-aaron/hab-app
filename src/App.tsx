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

  flight_data = {'1' : {duration: 60}, '2': {duration: 75}, '3': {duration: 100}};

  get_flight_info = (flight_id: string) => {
    return this.flight_data[flight_id];
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
        <GeneralInfo selected_flight = {this.state.selected_flight} get_fight_info = {this.get_fight_info} />
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

interface GeneralInfoProps {
  selected_flight : Option;
  get_flight_info: (flight_id: string) => {duration: number};
}
class GeneralInfo extends React.Component<GeneralInfoProps>{
  constructor(props: GeneralInfoProps){
    super(props);
  }
  render() {
    flight_info = this.props.get_flight_info(this.selected_flight.value)
    return (
      <div className="general-info">
        Duration of flight: {flight_info.duration}
      </div>
    )
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
