import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const LineChart = ({ isDashboard }) => {
  const chartRef = useRef(null);
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    const fetchBarangMasuk = async () => {
      try {
        const response = await axios.get("http://localhost:5022/barangmasuk");
        setArrayData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarangMasuk(); // Initial fetch

    const interval = setInterval(fetchBarangMasuk, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const labels = arrayData.map((item) =>
      new Date(item.createdAt).toLocaleDateString()
    );
    const kubisData = arrayData.map((item) => item.kubis);
    const lobakData = arrayData.map((item) => item.lobak);
    const ayamData = arrayData.map((item) => item.ayam);
    const saosData = arrayData.map((item) => item.saos);

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Kubis",
            data: kubisData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Lobak",
            data: lobakData,
            fill: false,
            borderColor: "rgb(255, 99, 132)",
            tension: 0.1,
          },
          {
            label: "Ayam",
            data: ayamData,
            fill: false,
            borderColor: "rgb(255, 205, 86)",
            tension: 0.1,
          },
          {
            label: "Saos",
            data: saosData,
            fill: false,
            borderColor: "rgb(54, 162, 235)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Ensures the chart fills its container
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [arrayData]); // Update chart when arrayData changes

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default LineChart;
