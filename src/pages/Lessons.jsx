import React, { useEffect, useState } from "react";
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
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { tokens } from "../theme";
import LineChart from "../components/LineChart";
import ProgressCircle from "../components/ProgressCircle";
import TableComponent from "../components/tablecomponent";
import axios from "axios";

// Format date function
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
  // State for table data and modal visibility
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch table data
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5022/barangprediksi"
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

  //handle sending data
  // InputField Define
  const [formData, setFormData] = useState({
    kubis: "",
    lobak: "",
    ayam: "",
    saos: "",
  });

  console.log(formData);

  const resetForm = () => {
    setFormData({
      kubis: "",
      lobak: "",
      ayam: "",
      saos: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleadd = async (e) => {
    try {
      // Sesuaikan endpoint
      const response = await axios.post(url + "/barangprediksi", formData);

      if (response.status === 201) {
        resetForm();
        handleClose();
      }
    } catch (error) {}
  };

  //end sending data

  // Theme and colors
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Modal open/close handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

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
          <div className="flex">
            <div style={{ marginRight: "10%" }}>
              <Typography variant="h5" sx={{ mb: "15px" }}>
                Prediksi
              </Typography>
            </div>
            <div className="ml-auto">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "2px",
                  backgroundColor: colors.blueAccent[600],
                  "&:hover": {
                    backgroundColor: colors.blueAccent[800],
                  },
                }}
                onClick={handleOpen}
              >
                Add data
              </Button>
            </div>
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

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "45%",
            height: "55%",
            bgcolor: "background.paper",
            borderRadius: "4px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Add New Data Prediksi
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Kubis"
              margin="normal"
              variant="outlined"
              name="kubis"
              value={formData.kubis}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Lobak"
              margin="normal"
              variant="outlined"
              name="lobak"
              value={formData.lobak}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Saos"
              margin="normal"
              variant="outlined"
              name="saos"
              value={formData.saos}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Ayam"
              margin="normal"
              variant="outlined"
              name="ayam"
              value={formData.ayam}
              onChange={handleInputChange}
            />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
                onClick={handleadd}
              >
                Add
              </Button>
              <Button onClick={handleClose} variant="contained" color="primary">
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </section>
  );
};

export default Lessons;
