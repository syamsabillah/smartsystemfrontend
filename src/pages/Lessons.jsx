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

// Format date function for Indonesia/Jakarta timezone
const formatDate = (dateString) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const Lessons = () => {
  // State for table data and modal visibility
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  // Fetch table data
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5022/barangprediksilatest"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTableData(); // Initial fetch
    const interval = setInterval(fetchTableData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  console.log(tableData);
  // Handle sending data
  const [formData, setFormData] = useState({
    kubis: "",
    lobak: "",
    ayam: "",
    saos: "",
    createdAt: "", // Added createdAt field
  });

  const resetForm = () => {
    setFormData({
      kubis: "",
      lobak: "",
      ayam: "",
      saos: "",
      createdAt: "", // Reset datetime field
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleadd = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5022/barangprediksi",
        formData
      );
      if (response.status === 201) {
        resetForm();
        handleClose();
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

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
            <Table sx={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%" }}>No</TableCell>
                  <TableCell sx={{ width: "20%" }}>Kubis</TableCell>
                  <TableCell sx={{ width: "20%" }}>Lobak</TableCell>
                  <TableCell sx={{ width: "20%" }}>Ayam</TableCell>
                  <TableCell sx={{ width: "20%" }}>Saos</TableCell>
                  <TableCell sx={{ width: "15%" }}>Waktu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{1}</TableCell>
                  <TableCell>{tableData.kubis}</TableCell>
                  <TableCell>{tableData.lobak}</TableCell>
                  <TableCell>{tableData.ayam}</TableCell>
                  <TableCell>{tableData.saos}</TableCell>
                  <TableCell>{formatDate(tableData.createdAt)}</TableCell>
                </TableRow>
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
            height: "70%",
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
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              type="datetime-local"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleInputChange}
            />
            <Box sx={{ mt: "auto", textAlign: "right" }}>
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
