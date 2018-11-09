import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleApiComponent from './util/GoogleApiComponent'
import Locations from './util/Locations'

class App extends Component {
    constructor(props) {
        super(props)       
    }
    state = {
        mapStyles: [
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#800040"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -20
                    },
                    {
                        "lightness": 55
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#80bfbf"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d9d9ff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#8080ff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#aeaeff"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ccc8fd"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#640032"
                    }
                ]
            }
        ],
        listLocations: [

            { title: 'Thomb of Alexander III', location: { lat: 29.935914, lng: 52.892454 }, id: 1 },
            { title: 'Perspolis', location: { lat: 29.935524, lng: 52.891566 }, id: 2 },
            { title: 'Thomb of Alexander II', location: { lat: 29.933199, lng: 52.894492 }, id: 3 }

        ],
        filteredLocation: [
           // { title: 'Thomb of Alexander III', location: { lat: 29.935914, lng: 52.892454 }, id: 1 },
          //  { title: 'Perspolis', location: { lat: 29.935524, lng: 52.891566 }, id: 2 },
          //  { title: 'Thomb of Alexander II', location: { lat: 29.933199, lng: 52.894492 }, id: 3 }
        ],
        markers: [
        ]
    }
    /*findFiltered(listLocations) {
        var  ul, li, a, i;
        let locations = [];
        ul = document.getElementById("myMenu");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (li[i].style.display != "none")
                locations.push(listLocations.filter(location => location.id == li[i].id));             
        }
        this.setState({
            filteredLocation: locations
        })

    }*/
    componentDidMount() {
        //   this.findFiltered(this.state.listLocations)
        console.log("App.js Mounted")
        let currentMarkers = []
        this.state.listLocations.map((location) => {
           /* var marker = new window.google.maps.Marker({
                position: location.location,
                map: map,
                title: location.title
            });*/
            var marker ={ position: location.location, title: location.title, map: null }
            currentMarkers.push(marker)
            /* marker.addListener('click', e => {
                 this.populateInfoWindow(marker, map)
             })*/
        })
     
        this.setState({
            filteredLocation: this.state.listLocations,
            markers: currentMarkers
        })
    }
    

    foursquare() {
        fetch('https://api.foursquare.com/v2/venues/explore?client_id=LOVKBEZQO43VNSGVC22RQ2Q1OOYSE3DTUY0EJRTILAZEFZSM&client_secret=5J1PFZIIS2DF1ZPXG4M20OJK3LWEMOTKGXQU225ULZDTHV0X&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee')
            .then(function () {
                // Code for handling API response
            })
            .catch(function () {
                // Code for handling errors
            });
    }
    searchLocation = (input) => {
        var filter, ul, li, a, i;
        let locations = [];
        let currentMarkers = [];
        this.setState({
            filteredLocation: locations
        })
        //console.log(this.state.filteredLocations)
        filter = input.toUpperCase();
        ul = document.getElementById("myMenu");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                let loc = this.state.listLocations.filter(location => location.id == li[i].id)[0];
                locations.push(loc);
                let marker = { position: loc.location,  title: loc.title }
                currentMarkers.push(marker)

            } else {
                li[i].style.display = "none";
            }
        }
        this.setState({
            filteredLocations: locations,
            markers: currentMarkers
        })


    }


    selectMarker(markerid) {

    }


    render() {
        // this.findFiltered(this.state.listLocations);
        console.log(this.state.markers);
        return (
            <div className="row">
               
                <div className="left">
                    <h2>Locations</h2>
                    <input type="text" id="mySearch" onKeyUp={(event) => this.searchLocation(event.target.value)} placeholder="Search.." title="Type in a category" />
                    <ul id="myMenu">
                        {this.state.listLocations.map((location) => (
                            <li key={location.location.lat + location.location.lng} id={location.id} onClick={this.selectMarker(location.id)}>
                                <a href="#"> {location.title} </a>
                            </li>
                        ))}
                    </ul>
                </div>
               
                       
                <div className="right">
                    <GoogleApiComponent id="myMap" rol="application" aria-label="map" options={{
                        center: { lat: 29.935524, lng: 52.891566 },
                        zoom: 13,
                        styles: this.state.mapStyles
                    }}
                       
                        filteredLocation={this.state.filteredLocation}
                        listLocations={this.state.listLocations}
                        currentMarkers={this.state.markers}
           
                    />
                </div>
            </div>
        );
    }
}

export default App;
