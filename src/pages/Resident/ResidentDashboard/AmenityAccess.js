import React, { useState, useEffect } from "react";
import { getAccessLogs, addAccessLog } from "../../../services/services";

function AmenityAccess(props) {

    const {user} = props
    const [logs, setLogs] = useState([])
    const [amenity, setAmenity] = useState({
        in_time:'',
        out_time:'',
        name: 'Pool',
        user_id: user.id
    })

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

    const handleOnChange = e => {
        const { name, value } = e.target;
        setAmenity({ ...amenity, [name]: value });
    };

    const submit = ()=>{
        if(amenity.in_time && amenity.out_time && amenity.name){
            addAccessLog(amenity).then(res=>console.log(res))
        }else{
            alert('All foields are mandatory!')
        }
    }

    return (
      <div>
        <h2>Request Access for Amenity</h2>
        <div className="report-body d-flex">
            <table>
                <tr>
                    <td>
                        <label>Type of amenity: </label>
                        <select value={amenity.name} name="name" onChange={handleOnChange}>
                            <option value="Pool">Pool</option>
                            <option value="Garden">Garden</option>
                            <option value="Tennis Court">Tennis Court</option>
                            <option value="Gym">Gym</option>
                        </select>
                    </td>
                    <td>
                        <label>In Time: </label>
                        <input name="in_time" onChange={handleOnChange} type="time" value={amenity.in_time}/>
                    </td>
                    <td>
                        <label>Out Time: </label>
                        <input name="out_time" onChange={handleOnChange} type="time" value={amenity.out_time}/>
                    </td>
                    <td><button onClick={submit}>Save</button></td>
                </tr>
            </table>
           
        </div>
        <div className=" d-flex justify-content-between align-items-center">
            <h2 className="recent-Articles">Access Logs</h2>
        </div>
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

export default AmenityAccess;
