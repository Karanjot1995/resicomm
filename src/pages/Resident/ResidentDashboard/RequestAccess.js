import React, { useState, useEffect } from "react";
import { getAccessLogs } from "../../../services/services";

function RequestAccess(props) {

  const {user} = props
  const [logs, setLogs] = useState([])

  useEffect(() => {
    let uid = user.id
    getAccessLogs({uid}).then(res=>setLogs(res.data))
  }, []);

    const getFormattedDate = (date) => {
        date = new Date(date)
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
    
        return month + '/' + day + '/' + year;
    }
    

    return (
      <div>
        <div className="report-body">
            <table>
                <tbody>
                <tr>
                    <th>Amenity</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Day</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                    {logs.length>0? logs.map(log=>
                    <tr>
                    <td>{log.amenity.name}</td>
                    <td>{log.in_time}</td>
                    <td>{log.out_time}</td>
                    <td>{getFormattedDate(log.created_at)}</td>
                    <td>{log.accepted!=0?(log.accepted==1?'Accepted':'Rejected'):'Requested'}</td>
                    </tr>
                    ):''}
                    
                
                </tbody>
            </table>
        </div>
      </div>
    );
}

export default RequestAccess;
