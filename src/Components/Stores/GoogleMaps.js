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
  const { id } = useParams();

  // State variables
  const [store, setStore] = useState([]);
  const [reload, setReload] = useState(false);

  // Firestore service
  const storeDataService = new StoreDataService();

  // Calculate position based on store's latitude and longitude
  const position =
    store.latitude && store.longitude
      ? { lat: store.latitude, lng: store.longitude }
      : { lat: 0, lng: 0 };

  // Fetch store data
  const getStore = async (id) => {
    try {
      const storeDoc = await storeDataService.getStoreFirebase(id);
      const storeData = storeDoc.data();

      setStore(storeData);
    } catch (error) {
      // console.log("get store error : ", error);
      console.error(error);
    }
  };
  // console.log("the store: ", store);

  // Effect to fetch store data when 'id' changes
  useEffect(() => {
    if (id) {
      getStore(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Effect to refresh page by AJAX
  useEffect(() => {
    if (reload) {
      getStore();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // Styles
  const InfoWindowStyle = {
    textTransform: "uppercase",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <APIProvider apiKey='GOOGLE_MAPS_API_KEY'>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={17} center={position} mapId='GOOGLE_MAPS_ID'>
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
