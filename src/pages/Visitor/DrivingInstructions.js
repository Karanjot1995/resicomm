import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./visitor.scss";
import "../../App.scss";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { getLocations } from "../../services/services";
import MapContainer from "./MapContainer";

export default function DrivingInstructions({ route }) {
  const location = useLocation();
  const destination = location.state.destination
    ? location.state.destination
    : {};
  const [showLanding, setShowLanding] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [locations, setLocations] = useState();
  const [loading, setLoading] = useState(true);

  // const { loading, error, data } = useQuery(getApartments);

  const clickHandler = () => {
    setShowLanding(!showLanding);
  };
  const onShowMap = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    getLocations()
      .then((response) => {
        if (response.status == 200) {
          let locations = [];
          response.locations.map((item) => {
            let buildingName = "";
            if (item.building.length === 1) {
              buildingName = "Building " + item.building;
            } else {
              buildingName = item.building;
            }

            let latitude = parseFloat(item.lat);
            let longitude = parseFloat(item.lng);

            let object = {
              name: buildingName,
              location: {
                lat: latitude,
                lng: longitude,
              },
            };
            locations.push(object);
          });

          setLocations(locations);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // navigator.geolocation.getCurrentPosition(success);
  }, []);

  const landingPage = () => {
    return (
      <MapContainer
        array={locations}
        isAdding={loading}
        destination={destination}
      />
    );
  };

  return (
    <div
    // style={{ height: "50%", width: "50%", top: 500 }}
    >
      {landingPage()}
    </div>
  );
}
