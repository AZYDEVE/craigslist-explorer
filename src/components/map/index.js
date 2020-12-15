import React from "react";
import { GoogleMap, Circle, Rectangle } from "@react-google-maps/api";

const Map = (props) => {
  return (
    <React.Fragment>
      {props.center ? (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={props.zoom || 14}
          center={props.center}
        >
          {props.circle ? (
            <Circle
              center={props.center}
              radius={props.circleRadius}
              options={{
                strokeColor: "#005edc",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#005edc",
                fillOpacity: 0.35,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                zIndex: 1,
              }}
            />
          ) : (
            ""
          )}
          {props.rectangle ? (
            <Rectangle
              bounds={{
                north: props.bounds.northeast.lat,
                south: props.bounds.southwest.lat,
                east: props.bounds.northeast.lng,
                west: props.bounds.southwest.lng,
              }}
              options={{
                strokeColor: "#005edc",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#005edc",
                fillOpacity: 0.35,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                zIndex: 1,
              }}
            />
          ) : (
            ""
          )}
        </GoogleMap>
      ) : (
        "loading Map"
      )}
    </React.Fragment>
  );
};

export default Map;
