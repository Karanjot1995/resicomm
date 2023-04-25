import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getAccessLogsCount, getAccessLogsReport } from "../../services/services";

ChartJS.register(ArcElement, Tooltip, Legend);

function ManagerDashboard(props) {
  const { boxData, reportData } = props;
  const [accessLogs, setAccessLogs] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    getAccessLogsReport(data)
      .then((response) => {
        setNewData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getAccessLogsCount(data)
      .then((response) => {
        setAccessLogs(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Define the data for the pie chart
  const data = {
    labels: ["Swimming Pool", "GYM", "Tennis Court", "Garden"],
    // labels: ["Swimming Pool"],
    datasets: [
      {
        label: "Number of Visitors",
        data: accessLogs,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  function downloadReportPDF() {
    const doc = new jsPDF();
    const tableData = [];

    // Add the table headers
    const headers = [
      "ID",
      "Username",
      "Amenity Type",
      "Date",
      "Checkin",
      "Checkout",
    ];
    tableData.push(headers);

    // Add the new data to the table
    newData.forEach((row) => {
      tableData.push(row);
    });

    // Generate the PDF
    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
    });
    doc.save("report.pdf");
  }

  function downloadReportPDF() {
    const doc = new jsPDF();
    const tableData = [];

    // Add the table headers
    const headers = [
      "ID",
      "Username",
      "Amenity Type",
      "Date",
      "Checkin",
      "Checkout",
    ];
    tableData.push(headers);


    // Add the table rows
    tableData.push(...newData);

    // Remove the first row from the table data
    tableData.shift();

    // Generate the PDF table
    doc.autoTable({
      head: [headers],
      body: tableData,
    });

    // Download the PDF file
    doc.save("report.pdf");
  }

  // Define a function to create an empty PDF file
  function createEmptyPDF() {
    const doc = new jsPDF();
    doc.save("report.pdf");
  }

  return (
    <div className="container">
      <div className="main">
        {/* <div className="box-container">
{boxData.map((box) => (
<div className="box box3">
<div className="text">
<h2 className="topic_heading">{box.description}</h2>
<h2 className="topic">{box.heading}</h2>
</div>
</div>
))}
</div> */}
        <div className="report_Container">
          <div className="report_Header">
            <h1 className="recent_Articles">Recent Reports</h1>
          </div>
          <div className="report-body">
            <table className="list">
              <thead>
                <tr>
                  {reportData.titles.map((t) => (
                    <th>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.rows.map((row) => (
                  <tr className="">
                    {row.map((d) => (
                      <td className="">{d}</td>
                    ))}
                    <td>
                      <button
                        className="view-report"
                        onClick={downloadReportPDF}
                      >
                        Download Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add the Doughnut component for the pie chart */}
        <div className="chart-container">
          <div
            style={{
              height: "600px",
              width: "500px",
              position: "absolute",
              paddingTop: "100px",
            }}
          >
            <Doughnut
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
