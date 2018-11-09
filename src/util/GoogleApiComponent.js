import React, { Component } from 'react';


class GoogleApiComponent extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)      
    }
    state = {
        filteredLocation: [],
        markers: [],
      map: null
    }
    onScriptLoad() {
        //console.log(!window.google)
        //if (!window.google) {
            let map = new window.google.maps.Map(
                document.getElementById(this.props.id),
                this.props.options
            );
            this.setState({
                map: map,
                markers: this.props.currentMarkers
        })
     //   this.props.onMapLoad(map)
        console.log(map)
        this.state.markers.map((marker) => {
            //console.log(map);
            
            //marker.setMap(this.state.map)
            var marker1 = new window.google.maps.Marker({
                position: marker.location,
                map: this.state.map,
                title: marker.title
            });
            console.log(marker1.getMap())
            marker1.addListener('click', e => {
                this.populateInfoWindow(marker1, this.state.map)
            })
        })
      //  }

       
        //this.findFiltered(this.props.listLocations)
       
       // this.props.onMapLoad(map)
    }
    componentWillMount() {
        console.log("Page mounted");
    }

    populateMarkers() {
       /* this.setState({
            markers: []
        })*/
        let currentMarkers = []
        this.props.filteredLocation.map((location) => {
            /*var marker = new window.google.maps.Marker({
                position: location.location,
                map: map,
                title: location.title
            });*/
            var marker = { position: location.location, map: this.state.map, title: location.title }
            currentMarkers.push(marker)
            /* marker.addListener('click', e => {
                 this.populateInfoWindow(marker, map)
             })*/
        })
        this.setState({
            markers: currentMarkers
        })

    }
  
    componentDidMount() {
        
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.google.com/maps/api/js?libraried=geometry&key=AIzaSyAntVdKHLUBM9rxoQz9sHbhS7ibr7Fbfm8`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            // Below is important. 
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
        
        if (this.props.filteredLocation.length < this.props.listLocations.length) {
           // this.populateMarkers();
           // console.log(this.state.markers);
            //     this.onScriptLoad();
            // console.log(this.props.filteredLocation);
        }
    }
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

    render() {
       // console.log(this.state.markers);
       // console.log(this.props.filteredLocation.length);
       // console.log(this.props.listLocations.length);
        
       /* if (this.props.filteredLocation.length < this.props.listLocations.length) {
            this.populateMarkers();
            console.log(this.state.markers);
        }*/
        return (
            <div id={this.props.id}>
              
               
</div>
        );
    }
}

export default GoogleApiComponent