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
} from "@mui/material";
import axios from "axios";

// Helper function to parse date and time
const parseDate = (dateString) => new Date(dateString);

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

// Combine and aggregate data
const combineAndAggregateData = (masukData, keluarData) => {
  const combined = {};

  // Process masukData
  masukData.forEach((entry) => {
    const dateKey = parseDate(entry.createdAt).toISOString().split("T")[0];
    ["lobak", "kubis", "saos", "ayam"].forEach((jenis) => {
      if (!combined[`${dateKey}-${jenis}`]) {
        combined[`${dateKey}-${jenis}`] = {
          date: dateKey,
          jenis,
          jumlahMasuk: 0,
          jumlahKeluar: 0,
          waktuMasuk: "",
          waktuKeluar: "",
        };
      }
      combined[`${dateKey}-${jenis}`].jumlahMasuk += entry[jenis];
      combined[`${dateKey}-${jenis}`].waktuMasuk = entry.createdAt;
    });
  });

  // Process keluarData
  keluarData.forEach((entry) => {
    const dateKey = parseDate(entry.createdAt).toISOString().split("T")[0];
    ["lobak", "kubis", "saos", "ayam"].forEach((jenis) => {
      if (!combined[`${dateKey}-${jenis}`]) {
        combined[`${dateKey}-${jenis}`] = {
          date: dateKey,
          jenis,
          jumlahMasuk: 0,
          jumlahKeluar: 0,
          waktuMasuk: "",
          waktuKeluar: "",
        };
      }
      combined[`${dateKey}-${jenis}`].jumlahKeluar += entry[jenis];
      combined[`${dateKey}-${jenis}`].waktuKeluar = entry.createdAt;
    });
  });

  return Object.values(combined);
};

const TableComponent = () => {
  //ambil data

  const [tableDataMasuk, setTableDataMasuk] = useState([]);
  const [tableDataKeluar, setTableDataKeluar] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("http://localhost:5022/barangmasuk");
        const response2 = await axios.get("http://localhost:5022/barangmasuk");
        setTableDataMasuk(response.data); // Assuming the response has a "temperature" field
        setTableDataKeluar(response2.data); // Assuming the response has a "temperature" field
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTableData(); // Initial fetch

    const interval = setInterval(fetchTableData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  //end ambil data

  const combinedData = combineAndAggregateData(tableDataMasuk, tableDataKeluar);

  return (
    <Box mt="20px">
      <Typography variant="h6" mb="10px">
        Data Tabel
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Jenis</TableCell>
              <TableCell>Jumlah Masuk</TableCell>
              <TableCell>Waktu Masuk</TableCell>
              <TableCell>Jumlah Keluar</TableCell>
              <TableCell>Waktu Keluar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinedData.map((row, index) => (
              <TableRow key={`${row.date}-${row.jenis}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.jenis}</TableCell>
                <TableCell>{row.jumlahMasuk}</TableCell>
                <TableCell>{formatDate(row.waktuMasuk)}</TableCell>
                <TableCell>{row.jumlahKeluar}</TableCell>
                <TableCell>{formatDate(row.waktuKeluar)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
