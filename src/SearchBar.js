
import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {
    render() {

        return (
            <div className="left">
                <h2>Locations</h2>
                <input type="text" id="mySearch" onKeyUp={(event) => this.props.searchLocation(event.target.value)} placeholder="Search.." title="Type in a category" />
                <ul id="myMenu">
                    {this.props.filteredLocation.map((location) => (
                        <li key={location.id} id={location.id} >
                            <button href="#" onClick={() => this.props.selectMarker(location.id)}> {location.title} </button>
                        </li>
                    ))}
                </ul>
            </div>)
    }
}

export default SearchBar;