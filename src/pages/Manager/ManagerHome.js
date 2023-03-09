import React, { useState, useEffect } from "react";

function ManagerHome(props) {

    const {employees} = props;

    return (
        <div className="container">
            <div class="main">
                <div className="box-container">
                    <button className="button">Manage Security Managers</button>
                    <button className="button">Manage Pool Managers</button>
                    <button className="button">Manage Garden Managers</button>
                    <button className="button">Manage Resident and Visitors</button>
                    <button className="button">Generate Reports</button>
                </div>
                <div className="form-container">
                    <form className="left">
                        <div>
                            <label>Employee Id </label>
                            <input type="number"/>
                        </div>

                        <div>
                            <label>Employee Name </label>
                            <input type="text"/>
                        </div>
                        
                        <div>
                            <label for="empId">Employee Email </label>
                            <input type="email"/>
                        </div>

                        <div>
                            <label>Phone Number</label>
                            <input type="tel"/>
                        </div>

                        <div className="form_action--button">
                            <input type="submit" value="submit"/>
                            <input type="reset" value="reset"/>
                        </div>  
                    </form>
                    <div className="right">
                        <table className="list" id="storeList">
                            <thead>
                                <tr>
                                    <th>Employee Id</th>
                                    <th>Employee Name</th>
                                    <th>Employee Email</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            {employees.map(employee=>
                                <tr>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td><button>Edit</button><button>Delete</button></td>
                                </tr>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ManagerHome;

