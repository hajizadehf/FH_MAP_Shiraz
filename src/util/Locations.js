import React, { Component } from 'react';
import PropTypes from 'prop-types'
/**
 * THIS IS NOT BEING USED ANYMORE
 */

class Locations extends React.Component {
    
    static propTypes = {
        listLocations: PropTypes.array.isRequired
      //  filteredLocations: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);       
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
    componentDidMount() {
   //     this.getFilteredList();
    }
    getFilteredList() {
        const map = new window.google.maps.map(
            document.getElementById("myMap"),
            this.props.options
        );
        this.state.filteredLocation.map((location) => {
            var marker = new window.google.maps.Marker({
                position: location.location,
                map: map,
                title: location.title
            });
            marker.addListener('click', e => {
                this.populateInfoWindow(marker, map)
            })
        })
    }
    forceUpdateHandler() {
   //     this.getFilteredList();
    //    this.forceUpdate();
    };
    populateInfoWindow(marker, map) {
        var infowindow = new window.google.maps.InfoWindow();
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.position + '</div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
            });
        }
    }
   
    state = {
        filteredLocations : []
    }
     
    // Sets the map on all markers in the array.
    //  function setMapOnAll(map) {
    //for (var i = 0; i < markers.length; i++) {
  //      markers[i].setMap(map);
  //  }
//}

// Removes the markers from the map, but keeps them in the array.
//function clearMarkers() {
 //   setMapOnAll(null);
//}
    selectMarker(markerid){

    }
    searchLocation = (input) => {
        var filter, ul, li, a, i;
        let locations = [];
        filter = input.toUpperCase();
        ul = document.getElementById("myMenu");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                let loc = this.props.listLocations.filter(location => location.id == li[i].id);
                locations.push(loc);
                
            } else {
                li[i].style.display = "none";
            }
        }
        this.setState({
           filteredLocations : locations
        })
        

    }
    render() {
        const { listLocations,map } = this.props
        return (
            <div className="left">
            <h2>Locations</h2>
                <input type="text" id="mySearch" onKeyUp={(event) => this.searchLocation(event.target.value)} placeholder="Search.." title="Type in a category" />
                <ul id="myMenu">
                    {listLocations.map((location) => (
                        <li key={location.location.lat + location.location.lng} id={location.id} onClick={this.selectMarker(location.id)}>
                            <a href="#"> {location.title} </a>                          
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}



export default Locations;
