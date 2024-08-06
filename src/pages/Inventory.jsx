import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { CSVLink } from "react-csv";

// Format date
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
  // Fetch data
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("http://localhost:5022/barangkeluar");
        setTableData(response.data); // Assuming the response has a "temperature" field
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTableData(); // Initial fetch

    const interval = setInterval(fetchTableData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <section id="lessons" className="w-full min-h-screen p-4 md:p-8">
      {/* Banner */}
      <div
        style={{ marginLeft: "15%" }}
        className="mb-8 banner-container-style text-white text-shadow bg-gradient-to-r from-blue-600 to-blue-800"
      >
        <div className="relative p-3 z-5">
          <div className="flex">
            <h1 className="banner-heading">Data Inventory</h1>
          </div>
        </div>

        <div className="banner-bg-style bg-parkay-floor" />
      </div>

      <div style={{ marginLeft: "15%" }}>
        {/* TABLE */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Kubis</TableCell>
                <TableCell>Lobak</TableCell>
                <TableCell>Ayam</TableCell>
                <TableCell>Saos</TableCell>
                <TableCell>Waktu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.kubis}</TableCell>
                  <TableCell>{row.lobak}</TableCell>
                  <TableCell>{row.ayam}</TableCell>
                  <TableCell>{row.saos}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Lessons */}
    </section>
  );
};

export default Lessons;
