import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { mapStyles } from "./MapStyles"
import { mapScriptUrl, fourSquareSearchURL, LoadMapScript, fourSquarePicsURL } from "./util"
import SearchBar from "./SearchBar"
import Map from "./Map"
 
class App extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }
    state = {        
        listLocations: [

        ],
        filteredLocation: [

        ],
        allMarkers: [],       
        map: null,
        infowindows: [],
        venues: [],
        photo: []
    }


   /**
    * This will run as soon as the script for google map has been loaded
    */
    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById('myMap'),
            {
                center: { lat: 30.080049, lng: 53.135805 },
            zoom: 10,
                styles: mapStyles,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: window.google.maps.ControlPosition.TOP_CENTER
                },
                scaleControl: true,
                zoomControl: true,
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_CENTER
                }
            });
        let currentMarkers = []
        let locations =[]
     
            this.state.venues.forEach((location, i) =>{
                var marker1 = new window.google.maps.Marker({
                    position: new window.google.maps.LatLng(
                        location.venue.location.lat,
                        location.venue.location.lng
                    ),
                //map: map,
                    title: location.venue.name,
                    id: location.venue.id,
                    address: location.venue.location.address ? location.venue.location.address : "Address not found" ,
                    animation: window.google.maps.Animation.DROP,
                    tabIndex: 0

                });
                
                marker1.setMap(map)
                marker1.setVisible(true);
                marker1.addListener('click', e => {
                    this.populateInfoWindow(marker1, map)
                })
                locations.push({
                    location: marker1.position,
                    title: marker1.title,
                    id: marker1.id
                })
            currentMarkers.push(marker1)
        })
        this.setState({
            map: map,
            allMarkers: currentMarkers,
            filteredLocation: locations,
            listLocations: locations
        })
        
    }
    /**
  * Fetch Foursquare venues pictures
  * TODO: Add this to the code
  */
     getVenuePictures = (venueid) => {
       
        let photo = "https://via.placeholder.com/150"
         axios
             .get(fourSquarePicsURL(venueid))
            .then(response => {

                let res = response.data.response.photos.items[0];
                photo = `${res.prefix}150x150${res.suffix}`;
                var photos = this.state.photo.concat({
                    id: venueid,
                    photo: photo
                });
                this.setState({
                    photo: photos
                })
                //this.setState({ listLocations: photo })
                // return photo
            })
            .catch(error => {

                alert("error! " + error);
                
            });
       
    };

    /*
     Use FourSquare API to ge the list of the locations
     */
    getVenues = () => {      

        axios
            .get(fourSquareSearchURL())
            .then(response => {
                this.setState(
                    {
                        venues: response.data.response.groups[0].items,
                        listLocations: response.data.response.groups[0].items
                    },
                    this.openMap()
                );               
              
            })
            .catch(error => {
                alert("error! " + error);
            });
    };
   

    


    componentWillMount() {
    
        this.getVenues();
        window.gm_authFailure = () =>
            alert(
                "Google Maps is have trouble loading."
            );   
    }
  
    /*
     This will run after the venues have been returned from forusquare API and will load the map
     */
    openMap = () => {      
       
        if (!window.google) {
            var s = LoadMapScript(mapScriptUrl); 
            // Below is important. 
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }
    /*
     * Results of an input in the search input will run through this code to filter accourdingly
     */
    searchLocation = input => {
        if (input !== "") {
            const { listLocations } = this.state;
            const filteredLocs = listLocations.filter(location => {
                return location.title.toLowerCase().includes(input.toLowerCase());
            });
            this.setState(
                {
                    filteredLocation: filteredLocs
                },
                () => this.filterMarkers()
            );
        } else {
            this.setState(
                {
                    filteredLocation: this.state.listLocations
                },
                () => this.filterMarkers()
            );
        }
    };
    /**
     * Markers that are in the selection will be set visible and the rest will be set to invisible on the map
     */
    filterMarkers() {        
        
        let flocIds = this.state.filteredLocation.map(a => a.id);
        this.state.allMarkers.forEach((marker) => {
                if (!flocIds.includes(marker.id)) {
                    marker.setVisible(false);
                }
                else {
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);                   
                    setTimeout(() => marker.setAnimation(null), 750);
                    marker.setVisible(true);
                   
                }            

            })
    }
   /*
    *This code will be called when the user selects a location from the location bar
    */
    selectMarker = input => {
        
        let selectedMarker = this.state.allMarkers.find(marker => marker.id === input);
        selectedMarker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => selectedMarker.setAnimation(null), 750);
        this.populateInfoWindow(selectedMarker);
        this.state.map.setZoom(13);
        this.state.map.setCenter(selectedMarker.position)
    }
    /**
     * Marker info window will be populated on the map and if there is any infowindow open it will be closed before that
     */
    populateInfoWindow(marker, map,) {
        var infowindow = new window.google.maps.InfoWindow();
        if (this.state.infowindows.length > 0) {
            this.state.infowindows.forEach((info) => {
                info.close();
            })
        }
        let infowindows =[]
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {            
            infowindow.marker = marker;
           
            infowindow.setContent(`<div><p>${marker.title}</p><p>${marker.address}</p></div>`);
            infowindow.open(map, marker);
            infowindows.push(infowindow);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
                infowindows.pop(infowindow)
            });
        }
        this.setState({
            infowindows: infowindows
        })
    }
  
    render() {
       
        
        return (
            <div className="container mr-2 ml-2 pr-0 pl-0">
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12 col-lg-2 pr-0 pl-0">
                        <SearchBar
                            filteredLocation={this.state.filteredLocation}
                            selectMarker={this.selectMarker}
                            searchLocation={this.searchLocation}
                        />
                    
            </div>
                    <div className="col-md-9 col-sm-12 col-xs-12 col-lg-10">
                        <div className="right">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
            
            )
        };
  }

export default App;
