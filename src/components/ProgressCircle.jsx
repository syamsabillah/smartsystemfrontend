import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";

const TempCircle = () => {
  //ambil data

  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await axios.get("http://localhost:5022/latestsuhu");
        setTemp(response.data.suhu); // Assuming the response has a "temperature" field
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTemperature(); // Initial fetch

    const interval = setInterval(fetchTemperature, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  //end ambil data

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Determine the background color based on temperature
  let backgroundColor;
  if (temp < 15) {
    backgroundColor = colors.blueAccent[500]; // Light blue
  } else if (temp >= 15 && temp < 30) {
    backgroundColor = "yellow"; // Yellow (you can customize this with a color from tokens)
  } else {
    backgroundColor = "red"; // Red (you can customize this with a color from tokens)
  }

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: "50%",
        width: "200px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        border: `2px solid ${colors.grey[300]}`, // Adjust border color as needed
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: colors.grey[100], fontWeight: "bold" }}
      >
        {temp}°C
      </Typography>
    </Box>
  );
};

export default TempCircle;
