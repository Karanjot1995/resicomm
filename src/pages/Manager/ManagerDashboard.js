import React, { useState, useEffect } from "react";

function ManagerDashboard(props) {
    const {boxData, reportData} = props

    return (
        <div className="container">
            <div className="main">
                <div className="box-container">
                    {boxData.map(box=>
                        <div className="box box3">
                            <div className="text">
                                <h2 className="topic_heading">{box.description}</h2>
                                <h2 className="topic">{box.heading}</h2>
                            </div>
                        </div>
                    )}
                </div>

                <div className="report_Container">
                    <div className="report_Header">
                        <h1 className="recent_Articles">Recent Reports</h1>
                        <button className="view">View All</button>
                    </div>
                    <div className="report-body">

                        <div className="report_topic_heading">
                            {reportData.titles.map(t=><h3 className="t-op">{t}</h3>)}
                        </div>

                        <div className="items">
                        {reportData.rows.map(row=>
                            <div className="item1">
                                {row.map(d=><h3 className="t-op-nextlvl">{d}</h3>)}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
   );
}
 
export default ManagerDashboard;

