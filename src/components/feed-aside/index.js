import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { convertDate } from "../../services/helper";
import { getLocations } from './../../api/location'
import Map from '../map';

import "./feed-aside.css";

const Aside = (props) => {

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [zoom, setZoom] = useState(9);

  // Get all locations from the database
  const getAllLocations = () => {
    getLocations()
      .then((response) => {
        if (response.data) {
          setLocations(response.data);
        }
      }).catch((err) => {
        console.log('Request to get locations failed', err);
      })
  }

  // Calculate the zoom level of the map
  const calculateZoom = () => {
    var GLOBE_WIDTH = 256; // a constant in Google's map projection
    if (coordinates.viewport) {
      var west = coordinates.viewport.southwest.lng;
      var east = coordinates.viewport.northeast.lng
      var angle = east - west;
      if (angle < 0) {
        angle += 360;
      }
      setZoom(Math.round(Math.log(100 * 360 / angle / GLOBE_WIDTH) / Math.LN2));
    }
  }

  // Find the coordinates of the filtered option
  const filterLocation = useCallback((loc) => {
    const filtered = locations.filter((el) => el.name === loc);
    if (filtered && filtered.length > 0) {
      setCoordinates(filtered[0]);
    } else {
      setDefaultCoordinates();
    }
  }, [locations]);

  // Set default coordinates of SF
  const setDefaultCoordinates = () => {
    setCoordinates({
      "bounds": {
        "northeast": {
          "lat": 37.9298239,
          "lng": -122.28178
        },
        "southwest": {
          "lat": 37.6398299,
          "lng": -123.173825
        }
      },
      "location": {
        "lat": 37.7749295,
        "lng": -122.4194155
      },
      "viewport": {
        "northeast": {
          "lat": 37.812,
          "lng": -122.3482
        },
        "southwest": {
          "lat": 37.70339999999999,
          "lng": -122.527
        }
      }
    });
  }

  // Load the post and set coordinates to post when on post page
  // also lock the select
  useEffect(() => {
    if (props.post && props.post.neighborhood) {
      const neighborhood = props.post.neighborhood.join(" ")
      filterLocation(neighborhood);
      setLocation(neighborhood);
    } else if (location === '') { // default value of SF
      setDefaultCoordinates();
    } else { // Find coordinates of option
      filterLocation(location)
    }
  }, [location, locations, props.post, filterLocation])

  useEffect(calculateZoom, [coordinates]);
  useEffect(getAllLocations, []);

  // When we go back from the post page to the feed page reset the map
  useEffect(() => {
    if (props.post === null) {
      setLocation("");
    }
  }, [props.post])

  return (
    <div className="aside">
      <div className="date">
        <div>
          {convertDate(Date.now()).split(' ')[0]}
        </div>
        <div>
          {convertDate(Date.now()).split(' ')[1]}
        </div>
      </div>
      <div className="divider"></div>
      <div className="location">
        <div>
          <div>
            San Francisco
        </div>
          <div>
            US, CA
        </div>
        </div>
        <div className="image"></div>
      </div>
      <div className="divider"></div>
      <div className="location-picker">
        <div>
          <select value={location} onChange={(event) => setLocation(event.target.value)} name="location">
            <option value="">All</option>
            {
              locations && locations.length > 0 ?
                locations.map((loc, index) => {
                  return <option key={index} value={loc.name}>{loc.name}</option>
                })
                :
                ''
            }
          </select>
        </div>
        <div className="map">
          <Map rectangle={true} center={coordinates.location} zoom={zoom} bounds={coordinates.viewport} />
        </div>
      </div>
      <div className="divider"></div>
      <div className="current">
        <div>
          Lists
        </div>
        <div className="arrow">
          ↓
        </div>
        <div>
          housing
        </div>
        <div className="arrow">
          ↓
        </div>
        <div>
          {
            props.post && props.post.title ?
              <Link
                className="back"
                to='/'
              >apartments housing for rent</Link>
              :
              "apartments housing for rent"
          }
        </div>
        {
          props.post && props.post.title ?
            <React.Fragment>
              <div className="arrow">
                ↓
              </div>
              <div>
                {props.post.title}
              </div>
            </React.Fragment>
            :
            ""
        }
      </div>
    </div>

  );
};

export default withRouter(Aside);
