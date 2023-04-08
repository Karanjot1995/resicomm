import React, { useState, useEffect } from "react";

function ManagerDashboard(props) {
  const { boxData, reportData } = props;

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
            <button className="view">View All</button>
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
                  <td><button className="view-report">View Report</button></td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
