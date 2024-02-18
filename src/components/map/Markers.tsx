import { Marker } from "react-map-gl";

const Markers = (props: MapboxProps) => {
  return (
    <Marker longitude={props?.long} latitude={props?.lat} anchor="bottom">
      {/* <img
        src={props?.icon}
        style={{ borderRadius: "50%", cursor: "pointer" }}
        onClick={props?.onClick}
        onMouseEnter={props?.onMouseEnter}
        onMouseLeave={props?.onMouseLeave}
        alt=""
      /> */}
      {props.icon}
    </Marker>
  );
};

export default Markers;

export interface MapboxProps {
  long: number;
  lat: number;
  icon: any;
  onClick?: (params: any) => any;
  onMouseEnter?: (params: any) => any;
  onMouseLeave?: (params: any) => any;
}
