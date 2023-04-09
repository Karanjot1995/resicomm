import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

ChartJS.register(ArcElement, Tooltip, Legend);

function ManagerDashboard(props) {
  const { boxData, reportData } = props;
  const [accessLogs, setAccessLogs] = useState([]);

  // Define the data for the pie chart
  const data = {
    labels: ["GYM", "Pool", "Tennis Court", "Garden"],
    datasets: [
      {
        label: "Number of Visitors",
        data: [1, 6, 1, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  function downloadReportPDF() {
    const doc = new jsPDF();
    const tableData = [];
    
    // Add the table headers
    const headers = ['ID', 'Username', 'Amenity Type', 'Date', 'Checkin', 'Checkout'];
    tableData.push(headers);
  
    // Add the given data to the table
    const newData = [    ["1", "Suprith K", "Pool", "2023-04-08", "09:00", "11:00"],
      ["2", "Suprith K", "Tennis Court", "2023-04-08", "11:00", "12:30"],
      ["3", "Aadi Desai", "Garden", "2023-04-08", "14:00", "15:30"],
      ["4", "Aarav Patel", "Gym", "2023-04-08", "16:00", "18:00"],
      ["5", "Aarushi Sharma", "Pool", "2023-04-08", "10:30", "11:30"],
      ["6", "Suprith K", "Garden", "2023-04-08", "09:00", "10:30"],
      ["7", "Aarav Patel", "Pool", "2023-04-08", "09:00", "10:00"],
      ["8", "Jatin S", "Garden", "2023-04-08", "10:00", "12:30"],
      ["9", "Jatin S", "Pool", "2023-04-08", "13:00", "15:00"],
      ["10", "Jatin S", "Garden", "2023-04-08", "10:00", "12:30"],
      ["11", "Aarav Patel", "Pool", "2023-04-08", "09:00", "10:00"],
    ];
  
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
    doc.save('report.pdf');
  }
  

// Define a function to create an empty PDF file
function createEmptyPDF() {
const doc = new jsPDF();
doc.save('report.pdf');
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
          <tr>
            {reportData.titles.map((t) => (
              <th>{t}</th>
            ))}
          </tr>
          {reportData.rows.map((row) => (
            <tr className="">
              {row.map((d) => (
                <td className="">{d}</td>
              ))}
              <td><button className="view-report" onClick={downloadReportPDF}>Download Report</button></td>
            </tr>
          ))}
        </table>
      </div>
    </div>

    {/* Add the Doughnut component for the pie chart */}
    <div className="chart-container">
      <div style={{ height: '600px', width: '500px', position: 'absolute' }}>
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