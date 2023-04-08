import React, { useState, useEffect } from "react";

function ManagerType(props) {
    const [start_time, setStart] = useState('');
    const [end_time, setEnd] = useState('');

    const saveHours = ()=>{
        console.log(start_time, end_time)
    }

  return (
    <div className="container">
      <div className="main">

        <div className="report_Container">
          {/* <div className="report_Header">
            <h1 className="recent_Articles">Recent Reports</h1>
          </div> */}
          <div className="report-body">
            <div className="manage-timing">
                <h3>Manage Timings</h3>
                <p className="mt-1">From: <input value={start_time} onChange={(e)=>setStart(e.target.value)} type="time"/> , To: <input value={end_time} onChange={(e)=>setEnd(e.target.value)} type="time"/> <button onClick={saveHours} className="view ml-1">Save</button></p>
            </div>
            {/* <table className="list">
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
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerType;
