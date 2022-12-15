import { Component, createEffect, createSignal } from 'solid-js';
import {docs} from './data/docdata.js'; 
import { RandomPoints } from './data/RandomPoints.js';
import { MakeAMap, MakeAClusteredMap } from './Map';

const App: Component = () => {
  
  // boolean signal: show we show the marker on the map or not?
  let [getStatus, setStatus] = createSignal(true);
  const toggle = () => {
    setStatus(!getStatus());
    console.log(getStatus());
  }
  
  let clusterPointData = RandomPoints(500);

  let [getclusterPointfilter, setclusterPointFilter] = createSignal({language: "all", testfeature: false});

  console.log(docs);
  
  // MakeAMap() is starting to put all the onmount stuff into a component that can be called!
  // passing the signal as a prop
  return (
    <div>
      <h1>Working Examples of Leaflet in SolidJS</h1>
      <h3>Example 1: Regular markers, reactive on/off button</h3>
      <p>Click the button to toggle the marker</p>
      <button onclick = {toggle}>Marker is {getStatus() ? "ON" : "OFF"}</button>
      <MakeAMap trigger={getStatus()}/>

      <hr/>

      <h3>Example 2: Clustered markers, drop-down filter</h3>


    <label>Select a Language: <select name="point-lang" id="point-lang" onChange={(e) => setclusterPointFilter({...getclusterPointfilter(), language: e.currentTarget.value})}>
      
    <option value="all">All</option>
    <option value="English">English</option>
      <option value="French">French</option>
    </select>
    </label>
    
    <MakeAClusteredMap trigger={getStatus()} clusterPoints={clusterPointData} filter={getclusterPointfilter()}/>

    {/* <div id='main-map' style="height:800px;"/> */}
    </div>
    );
  };
  
  export default App;
