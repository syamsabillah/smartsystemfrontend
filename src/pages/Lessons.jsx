import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

import LineChart from "../components/LineChart";
import ProgressCircle from "../components/ProgressCircle";
import TableComponent from "../components/tablecomponent";
import axios from "axios";

//fotmat date
const formatDate = (dateString) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const Lessons = () => {
  // If the user is not logged in, redirect to the login page

  //fetch data
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5022/barangprediksi"
        );

        setTableData(response.data); // Assuming the response has a "temperature" field
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTableData(); // Initial fetch

    const interval = setInterval(fetchTableData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  //end fetch

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <section id="lessons" className="w-full min-h-screen p-4 md:p-8 ">
      {/* Banner */}
      <div
        style={{ marginLeft: "15%" }}
        className="mb-8 banner-container-style text-white text-shadow bg-gradient-to-r from-blue-600 to-blue-800"
      >
        <div className="relative p-3 z-5">
          <h2 className=" banner-heading">
            Don't forget to look and pay attention
          </h2>
        </div>
        <div className="banner-bg-style bg-parkay-floor" />
      </div>
      <Box m="20px" ml="15%">
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="2px"
        >
          {/* ROW 2 */}
          <Box gridColumn="span 8" gridRow="span 2">
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            ></Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>

          {/* ROW 3 */}
          <Box gridColumn="span 4" gridRow="span 2">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="15px"
            >
              <ProgressCircle />
              <Typography variant="h5" sx={{ mt: "15px" }}>
                Current Temperature
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* TABLE */}
        <TableComponent />
        <br /> <br />
        <div>
          <div>
            <Typography variant="h5" sx={{ mb: "15px" }}>
              Prediksi
            </Typography>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Jenis</TableCell>
                  <TableCell>Jumlah Prediksi</TableCell>
                  <TableCell>Waktu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.flatMap((row, rowIndex) =>
                  Object.entries(row)
                    .filter(([key]) => key !== "id" && key !== "createdAt")
                    .map(([jenis, jumlahPrediksi], index) => (
                      <TableRow key={`${row.id}-${jenis}`}>
                        <TableCell>
                          {rowIndex * Object.keys(row).length + index + 1}
                        </TableCell>
                        <TableCell>{jenis}</TableCell>
                        <TableCell>{jumlahPrediksi}</TableCell>
                        <TableCell>{formatDate(row.createdAt)}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>

      {/* Lessons */}
    </section>
  );
};

export default Lessons;
