import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";

import "./../../App.scss";

const MapContainer = ({ array, loading, destination }) => {
  const google = window.google;
  const [selected, setSelected] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});
  const [directions, setDirections] = useState(null);
  const [directionSteps, setDirectionSteps] = useState();
  const [error, setError] = useState(null);

  const markerRef = useRef(null);

  const defaultCenter = {
    lat: 32.72946119547443,
    lng: -97.11517166830518,
  };

  const onSelect = (item) => {
    setSelected(item);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const currentPosition = {
      lat: latitude,
      lng: longitude,
    };
    setCurrentPosition(currentPosition);
    getDirections();
  };

  const getDirections = () => {
    const destination_place = destination
      ? new window.google.maps.LatLng(
          parseFloat(destination.lat),
          parseFloat(destination.lng)
        )
      : defaultCenter;
    var origin = new window.google.maps.LatLng(
      currentPosition.lat,
      currentPosition.lng
    );

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination_place,
        travelMode: "DRIVING",
      },
      (result, status) => {
        // console.log("result is " + JSON.stringify(result.routes[0].legs[0].steps));
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionSteps(result.routes[0].legs[0].steps);
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };

  // const footer = (
  //   <div className="footer">
  //     <div className="inner-footer">
  //       <span className="location-text">Choose location and press</span>
  //       <button onClick={() => getLocation(currentPosition)}>Next</button>
  //     </div>
  //   </div>
  // );

  const mapStyles = () => {
    if (!loading) {
      return {
        marginTop: "0px",
        height: "70vh",
        width: "50vw",
        borderRadius: "10px",
      };
    } else {
      return {
        marginTop: "0px",
        height: "70vh",
        width: "50vw",
        borderRadius: "10px",
      };
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [currentPosition]);

  return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyD0Z0FXlpdqVn_9l-6BR501_1OXhfAbY_Y"
      >
        <div className="p-3 pt-5">
          <div className="d-flex row ps-3 card align-items-stretch">
            <div className="w-50">
              <GoogleMap
                id="example-map"
                mapContainerStyle={mapStyles()}
                draggable={true}
                zoom={15}
                //   center={currentPosition.lat ? currentPosition : defaultCenter}
              >
                {array
                  ? array.map((item) => {
                      const posi = {
                        lat: item.location.lat,
                        lng: item.location.lng,
                      };
                      return (
                        <Marker
                          key={item.id}
                          position={posi}
                          onClick={() => onSelect(item)}
                        />
                      );
                    })
                  : null}
                {loading ? (
                  <Marker
                    position={currentPosition}
                    ref={() => markerRef}
                    onDragEnd={(e) => onMarkerDragEnd(e)}
                    draggable={true}
                  />
                ) : null}
                {selected.location ? (
                  <InfoWindow
                    position={selected.location}
                    onCloseClick={() => setSelected({})}
                  >
                    <div className="infowindow">
                      <p>{selected.title}</p>
                      {/* <img
                  src={selected.image}
                  className="small-image"
                  alt="rental"
                /> */}
                      <p>{selected.name}</p>
                      {/* <p>sqm2: {selected.sqm}</p>
                <p>bedrooms: {selected.bedrooms}</p> */}
                    </div>
                  </InfoWindow>
                ) : null}

                {currentPosition.lat && <Marker position={currentPosition} />}

                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </div>
            <div className="w-50 ms-5 d-flex column align-items-start">
              <h2>Driving Instructions:</h2>
              <div
                className="card rounded"
                style={{ flex: 1, overflowY: "scroll" }}
              >
                <ul>
                  {directionSteps &&
                    directionSteps.map((item) => {
                      return (
                        <li key={item.id}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.instructions,
                            }}
                          ></div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LoadScript>
    </>
  );
};

export default MapContainer;
