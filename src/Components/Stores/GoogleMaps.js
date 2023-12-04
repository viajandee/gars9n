import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { StoreDataService } from "../../helpers/firebase_helper";
import { useParams } from "react-router-dom";

const GoogleMaps = () => {
  // Get Store
  const [store, setStore] = useState([]);
  const { id } = useParams();
  // for firstore
  const storeDataService = new StoreDataService();

  const [reload, setReload] = useState(false);

  const position =
    store.latitude && store.longitude
      ? { lat: store.latitude, lng: store.longitude }
      : { lat: 0, lng: 0 };

  const getStore = async (id) => {
    try {
      const storeDoc = await storeDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();

      setStore(storeData);
    } catch (error) {
      console.log("get store error : ", error);
    }
  };
  // console.log("the store: ", store);

  useEffect(() => {
    if (id) {
      getStore(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Refresh the page by AJAX
  useEffect(() => {
    if (reload) {
      getStore();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const InfoWindowStyle = {
    textTransform: "uppercase",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <APIProvider apiKey={process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId='e22b8fb5b9022403'>
          <AdvancedMarker position={position} onClick={() => setStore(true)}>
            <Pin borderColor={"white"} glyphColor={"white"} />
          </AdvancedMarker>
          {store && (
            <InfoWindow
              position={position}
              onCloseClick={() => setStore(false)}>
              <p style={InfoWindowStyle}>{store.name}</p>
              <p style={{ color: "black", textAlign: "center" }}>
                {store.location}
              </p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMaps;
