import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "react-map-gl";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Markers from "./Markers";
import { images } from "../../assets";
import { Button, Stack, Typography } from "@mui/material";
const MapBox = ({ address }: { address?: string }) => {
  const { LocationIcon } = images;
  const mapRef = useRef<any>();
  const [addressMarker, setAddressMarker] = useState<any>(null);
  useEffect(() => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaHVhbm5nbzEyMCIsImEiOiJjbHFhbjdvem8xeGt1MmxydzBsZzBqdTRxIn0.4rtZQfYSLpyMRMf7m7Swtg`
      )
      .then(function (response) {
        setAddressMarker({
          long: response.data.features[0].center[0],
          lat: response.data.features[0].center[1],
        });
      })
      .catch(function (error) {});
  }, [address]);

  useEffect(() => {
    if (addressMarker) {
      mapRef.current?.flyTo({
        center: [addressMarker.long, addressMarker.lat],
        duration: 2500,
      });
    }
  }, [addressMarker]);

  const showInMapClicked = (long: number, lat: number) => {
    window.open("https://maps.google.com?q=" + lat + "," + long);
  };

  return (
    <Stack flexDirection="column" height="100%" gap="24px">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 106.631423,
          latitude: 10.855893,
          zoom: 16,
        }}
        mapboxAccessToken={`pk.eyJ1IjoiaHVhbm5nbzEyMCIsImEiOiJjbHFhbjdvem8xeGt1MmxydzBsZzBqdTRxIn0.4rtZQfYSLpyMRMf7m7Swtg`}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        {addressMarker && (
          <Markers
            long={addressMarker?.long}
            lat={addressMarker?.lat}
            icon={<LocationIcon color="red" width="40px" height="40px" />}
          />
        )}
      </Map>
      <Button
        variant="contained"
        color="primary"
        sx={{
          display: "flex",
          gap: "4px",
          borderRadius: "30px",
          width: "100%",
        }}
        onClick={() => showInMapClicked(addressMarker.long, addressMarker.lat)}
      >
        <Typography variant="label1">Xem bản đồ</Typography>
      </Button>
    </Stack>
  );
};

export default MapBox;
