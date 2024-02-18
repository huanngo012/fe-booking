import { Box } from "@mui/material";
import "./style.scss";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flower-spinner">
        <div className="dots-container">
          <div className="bigger-dot">
            <div className="smaller-dot"></div>
          </div>
        </div>
      </div>
    </Box>
  );
};
export default Loading;
