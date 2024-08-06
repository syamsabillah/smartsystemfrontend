import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { CSVLink } from "react-csv";

// Format date

const Lessons = () => {
  // Fetch data
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5022/barangkeluarweek"
        );
        setTableData(response.data);
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
        <CSVLink
          data={tableData}
          filename={"data_inventory.csv"}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Download CSV
          </Button>
        </CSVLink>
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
                <TableCell>Minggu</TableCell>
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
                  <TableCell>{row.minggu}</TableCell>
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
