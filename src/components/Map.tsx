// import a bunch of leaflet stuff!

import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import 'leaflet.markercluster';

import { createEffect, onMount } from 'solid-js';

// note the markerIcon lines: to address known issue (with webpack?) where Leaflet won't
// be able to find the marker icon in production
// https://stackoverflow.com/questions/60174040/marker-icon-isnt-showing-in-leaflet
import markerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
L.Marker.prototype.setIcon(L.icon({
  iconUrl:markerIcon
}))


// leaflet only works if you start doing stuff after the page properly exists (has rendered?)
// so we render the map and create our effects inside onMount() so they won't exist until the page does
export function MakeAMap(props?: any) {
  
  // Leaflet initialization has to happen inside onMount or it won't work
  onMount(() => {
    const map = L.map('make-a-map').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // add a single marker to a layer. note it's in an array
  let markerLayer = L.layerGroup([
    L.marker([51.5, -0.09])
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup()
  ]);
  
  // reactive effect to add or remove the marker based on our reactive prop
  createEffect (() => {
    console.log("effect fired");
    if (props.trigger){
      map.addLayer(markerLayer);
    }
    if (!props.trigger){
      map.removeLayer(markerLayer);
    }
  });
});

return <div id="make-a-map" style="height:300px"/>

}


export function MakeAClusteredMap(props?: any) {
  
  onMount(() => {
    const map = L.map('make-a-clustered-map').setView([45, -75.5], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  let pointClusters = L.markerClusterGroup();
  props.clusterPoints.forEach ((e: any) => pointClusters.addLayer(L.marker([e.lat, e.lon]).bindPopup(e.languages_spoken)));
  map.addLayer(pointClusters);
  
  // Filter here for language
  createEffect (() => {
    console.log(props.filter);
    
    map.removeLayer(pointClusters);
    pointClusters = L.markerClusterGroup();
    
    if (props.filter.language === 'all') {
      console.log('selected all')
      props.clusterPoints.forEach ((e: any) => pointClusters.addLayer(L.marker([e.lat, e.lon]).bindPopup(e.languages_spoken)));
      
    } else {
      props.clusterPoints.filter((e: any) => e.languages_spoken.search(props.filter.language) >= 0)
      .forEach ((e: any) => pointClusters.addLayer(L.marker([e.lat, e.lon])
      .bindPopup(e.languages_spoken)));
    }
    
    map.addLayer(pointClusters);
    
  });
});

return <div id="make-a-clustered-map" style="height:300px"/>

}