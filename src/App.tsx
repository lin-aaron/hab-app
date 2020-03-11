import React from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css'
import logo from './stac_logo.png';
import './App.css';
import { isUndefined } from 'util';
import firebase from 'firebase';
import 'firebase/firestore'

interface AppState {
  selected_flight: Option,
  selected_point?: string,
  current_information: any[]
}
class App extends React.Component<{}, AppState> {
  constructor() {
    super({});
    this.state = {
      selected_flight: { value: '1', label: 'Current Flight (Live)' },
      selected_point: undefined,
      current_information: [],
    }
  }

  get_currentinfo = async (option: string) => {
    var currentinfo: Array<any> = [];
    var db = firebase.firestore();
    db.collection(option).get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        console.log(doc.data());
        currentinfo.push(doc.data());
      });
    });
    console.log(currentinfo);
    return currentinfo;
  }

  handle_flight_change = (option: Option) => {
    var currentinfo: Array<any> = [];
    var promise = this.get_currentinfo(option.value).then(console.log);
    Promise.resolve(promise);
//     Promise.all([promise]).then(function(values) {
//   console.log(values);
// });

    this.setState({ selected_flight: option, current_information: [], selected_point: "ihi" });


  //   var db = firebase.firestore();
  //   var docRef = db.collection("HAB IV Test Flight 1").doc("19-11-11 10:41:50");
  //
  //   docRef.get().then(function(doc) {
  //     if (doc.exists) {
  //         //flight_info.append(doc.data());
  //         console.log("Document data:", doc.data());
  //         // var object = InfoPanel.refs.flight_data;
  //         // TO DO: figure out how to reference paragraph objects in react
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });
  }


  // componentDidMount(){
  //   var db = firebase.firestore();
  //   var docRef = db.collection("HAB IV Test Flight 1").doc("19-11-11 10:41:50");
  //
  //   docRef.get().then(function(doc) {
  //     if (doc.exists) {
  //         //flight_info.append(doc.data());
  //         console.log("Document data:", doc.data());
  //         // var object = InfoPanel.refs.flight_data;
  //         // TO DO: figure out how to reference paragraph objects in react
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });
  //
  // }

  // flight_data: { [id: string]: Flight; } = { '1': { duration: 60 }, '2': { duration: 75 }, '3': { duration: 100 } };
  //
  // get_flight = (flight_id: string) => {
  //   return this.flight_data[flight_id];
  // }


  get_point = (point_id: string | undefined) => {
    console.log(typeof this.state.current_information);
    var currentinfo = this.state.current_information;
    // if (currentinfo == undefined){
    currentinfo.forEach(elem=> console.log(elem));
    if (currentinfo != undefined) console.log(currentinfo.length);
      return (
        {
          timestamp: new Date(Date.now()), heading: 0 , altitude: 0
        }
      );
    // }

    // return (
    //   {
    //     timestamp: new Date(Date.now()), heading: currentinfo[currentinfo.length-1].heading , altitude: currentinfo[currentinfo.length-1].altitude
    //   }
    // );
  }

  // get_point = (option: Option) => {
  //
  //   return (
  //     {
  //       timestamp: new Date(Date.now()), heading: 246, altitude: 135
  //     }
  //   );
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo"><img src={logo} alt="logo" /></div>
          <div className="App-title"><p>HAB Tracker</p></div>
        </header>
        <div className="App-wrapper">
          <MapPanel selected_flight={this.state.selected_flight} />
          <InfoPanel selected_flight={this.state.selected_flight} selected_point={this.state.selected_point} handle_flight_change={this.handle_flight_change} get_point={this.get_point} />
        </div>
        <footer className="App-footer">Built by <a href="https://stac.berkeley.edu">Space Technologies at Cal</a>, 2019</footer>
      </div>
    );
  }
}

interface Flight {
  duration: number;
}
interface Point {
  timestamp: Date;
  heading: number;
  altitude: number;

}
interface InfoPanelProps {
  selected_flight: Option;
  selected_point?: string;
  handle_flight_change: (option: Option) => void;
  //get_flight: (flight_id: string) => Flight;
  get_point: (point_id: string | undefined) => Point;
}
class InfoPanel extends React.Component<InfoPanelProps> {
  constructor(props: InfoPanelProps) {
    super(props);
  }

  options = [{ value: '1', label: 'Current Flight (Live)' }, { value: '2', label: 'HAB III' }, { value: '3', label: 'HAB II' }];

  get_options = () => {
    var options: Array<any> = [];
    var db = firebase.firestore();
    db.collection("Flights").get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        console.log(doc.data());
        options.push({value: doc.id, label: doc.id});
      });
    });
    console.log(options);
    return options;
  }

  render() {
    this.options = this.get_options();
    return (
      <div className="info-panel">
        <h3>Track flight status</h3>
        <Dropdown className="flight-dropdown"
          options={this.options}
          value={this.props.selected_flight}
          onChange={this.props.handle_flight_change} />
        <GeneralInfo selected_flight={this.props.selected_flight}/>
        <PointInfo selected_point={this.props.selected_point} get_point={this.props.get_point} />
      </div>
    );
  }
}

interface GeneralInfoProps {
  selected_flight: Option;
  //get_flight: (flight_id: string) => Flight;
}
class GeneralInfo extends React.Component<GeneralInfoProps>{
  constructor(props: GeneralInfoProps) {
    super(props);
  }
  render() {
    //const flight = this.props.get_flight(this.props.selected_flight.value)
    return (
      <div className="general-info">      </div>
    )
  }
}
interface PointInfoProps {
  selected_point?: string;
  get_point: (point_id: string | undefined) => Point;
}
class PointInfo extends React.Component<PointInfoProps>{
  constructor(props: PointInfoProps) {
    super(props);
  }
  render() {
    const point = this.props.get_point(this.props.selected_point);
    return (
      <div className="point-info">
        <p>Time: {point.timestamp.toLocaleString()}</p>
        <p>Altitude: {point.altitude}</p>
        <p>Heading: {point.heading}</p>
      </div>
    )
  }
}

interface MapProps {
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
