import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addEmployee, editEmployee } from "../../services/services";
import {
  validateDepartment,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhone,
} from "./validate";
import { Weekdays } from "../../utils/constants";
import { convertTo12Hour } from "../../utils/utils";

function ManagerHome(props) {
  const { boxData } = props;
  const [users, setUsers] = useState(props.users);
  const [errMsgs, setErrMsgs] = useState({});
  const [clicked, setClicked] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [employee, setEmployee] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    department: "",
  });

  const [editEmp, setEditEmp] = useState({
    id: "",
    email: "",
    fname: "",
    lname: "",
    phone: "",
    type: "",
    additional_attributes: null,
  });

  const [edit, setEdit] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const addEmp = (e) => {
    e.preventDefault();
    let valid = true;
    let emp = employee;
    emp.type = "employee";
    if (!emp.department) {
      emp.department = user.department;
    }
    for (const key in errMsgs) {
      if (errMsgs[key]) {
        valid = false;
      }
    }
    if (!emp.email || !emp.password || !emp.fname || !emp.lname || !emp.phone) {
      alert("All fields marked with * are mandatory!");
    } else {
      if (valid) {
        addEmployee(emp).then((res) => {
          if (res.status == 200) {
            alert(res.message);
            window.location.href = "dashboard";
          }
        });
      }
    }
  };

  const deleteEmployee = (e, email) => {
    e.preventDefault();
    let emps = users;
    emps = emps.filter((emp) => emp.email != email);
    setUsers(emps);
  };

  const editEm = (email) => {
    let emp = {};
    users.map((em) => {
      if (em.email == email) {
        emp = em;
      }
    });
    setEdit(email);
    setEditEmp(emp);
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditEmp({ ...editEmp, [name]: value });
  };

  const handleAdditionalAttributeEdit = (value) => {
    setEditEmp({ ...editEmp, additional_attributes: value });
  };

  const saveEmployee = (email) => {
    let emp = {};
    let emps = users;
    editEmployee(editEmp).then((res) => {
      if (res.status == 200) {
        alert(res.message);
        window.location.reload(true);
      }
    });
  };

  useEffect(() => {
    // let selected = window.location.pathname.replace("/", "");
    // setUserType(selected);
    // getEmployees().then(data=>{
    //   console.log(data)
    //   setEmployees(data.building)
    // })
  });

  const changeView = (box) => {
    let dept = box.dept;
    let usrs = [];
    if (box.role == "user") {
      usrs = props.users.filter((u) => u.type == "user");
      dept = "residents";
    } else if (box.role == "visitor") {
      usrs = props.users.filter((u) => u.type == "visitor");
      dept = "visitors";
    } else {
      usrs = props.users.filter((u) => u.department == dept);
    }
    setUsers(usrs);
    setClicked(dept);
  };

  return (
    <div className="container">
      <div className="main">
        <h2>Manage Entities</h2>
        <br />
        {user.type == "manager" && user.department == "building" ? (
          <div className="box-container">
            {boxData.map((box) => (
              <button onClick={() => changeView(box)} className="button">
                {box.title}
              </button>
            ))}
          </div>
        ) : (
          ""
        )}

        <div className="form-container">
          <form className="left">
            <div className="add-emp-inp">
              <label>First Name</label>
              <input
                name="fname"
                onChange={(e) =>
                  validateFirstName(
                    e,
                    setEmployee,
                    employee,
                    errMsgs,
                    setErrMsgs
                  )
                }
                type="text"
                value={employee.fname}
              />
              <p className="error-msg">
                {errMsgs["fname"] ? errMsgs["fname"] : ""}
              </p>
            </div>

            <div className="add-emp-inp">
              <label>Last Name </label>
              <input
                name="lname"
                type="text"
                onChange={(e) =>
                  validateLastName(
                    e,
                    setEmployee,
                    employee,
                    errMsgs,
                    setErrMsgs
                  )
                }
                value={employee.lname}
              />
              <p className="error-msg">
                {errMsgs["lname"] ? errMsgs["lname"] : ""}
              </p>
            </div>

            <div className="add-emp-inp">
              <label htmlFor="">Employee Email </label>
              <input
                name="email"
                type="email"
                onChange={(e) =>
                  validateEmail(e, setEmployee, employee, errMsgs, setErrMsgs)
                }
                value={employee.email}
              />
              <p className="error-msg">
                {errMsgs["email"] ? errMsgs["email"] : ""}
              </p>
            </div>

            <div className="add-emp-inp">
              <label>Phone Number</label>
              <input
                name="phone"
                type="number"
                onChange={(e) =>
                  validatePhone(e, setEmployee, employee, errMsgs, setErrMsgs)
                }
                value={employee.phone}
              />
              <p className="error-msg">
                {errMsgs["phone"] ? errMsgs["phone"] : ""}
              </p>
            </div>

            <div className="add-emp-inp">
              <label>Password</label>
              <input
                name="password"
                type="text"
                onChange={(e) =>
                  validatePassword(
                    e,
                    setEmployee,
                    employee,
                    errMsgs,
                    setErrMsgs
                  )
                }
                value={employee.password}
              />
              <p className="error-msg">
                {errMsgs["password"] ? errMsgs["password"] : ""}
              </p>
            </div>

            {user.type == "manager" && user.department == "building" ? (
              <div className="add-emp-inp">
                <label>Department</label>
                <select
                  name="type"
                  onChange={(e) =>
                    validateDepartment(
                      e,
                      setEmployee,
                      employee,
                      errMsgs,
                      setErrMsgs
                    )
                  }
                  value={employee.department}
                >
                  <option value="pool">pool</option>
                  <option value="garden">garden</option>
                  <option value="security">security</option>
                </select>
                <p className="error-msg">
                  {errMsgs["department"] ? errMsgs["department"] : ""}
                </p>
              </div>
            ) : (
              ""
            )}

            <div className="form_action--button">
              <input type="submit" onClick={addEmp} value="submit" />
              <input type="reset" value="reset" />
            </div>
          </form>
          <div className="right">
            <h3 style={{ textTransform: "uppercase" }}>{clicked}</h3>
            <table className="list" id="storeList">
              {/* <thead> */}
              <thead>
                <tr>
                  {/* <th>Employee Id</th> */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  {!(clicked == "residents" || clicked == "visitors") &&
                  <th>Department</th>}

                  {!(clicked == "residents" || clicked == "visitors") &&
                    Weekdays.map((day, index) => {
                      let dayString = day.slice(0, 3);
                      {
                        /* let startTime = convertTo12Hour(
                              amenityDetails[dayString + "_in_time"]
                            );

                            let endTime = convertTo12Hour(
                              amenityDetails[dayString + "_out_time"]
                            ); */
                      }

                      return <th className="ps-5 pe-5">{dayString}</th>;
                    })}
                </tr>
              </thead>
              {/* </thead> */}
              {/* {employees && employees.map(employee=>
                                <tr>
                                    <td>{employee.fname + ' ' + employee.lname}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td><button onClick={()=>editEmployee(employee.email)}>Edit</button><button onClick={(e)=>deleteEmployee(e,employee.email)}>Delete</button></td>
                                </tr>
                            )} */}
              <tbody>
                {users &&
                  users.map((employee) =>
                    edit !== employee.email ? (
                      <tr>
                        <td>{employee.fname + " " + employee.lname}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.type}</td>
                  {!(clicked == "residents" || clicked == "visitors") &&
                        <td>{employee.department}</td>}
                        {!(clicked == "residents" || clicked == "visitors") &&
                          Weekdays.map((day, index) => {
                            let dayString = day.slice(0, 3).toLocaleLowerCase();
                            let additional_attributes =
                              employee.additional_attributes;
                            let val = "";
                            if (additional_attributes) {
                              let obj = JSON.parse(additional_attributes);
                              let timingObj = obj.timings;
                              let inTime = timingObj[dayString + "_in_time"]
                                ? timingObj[dayString + "_in_time"]
                                : "";
                              let outTime = timingObj[dayString + "_out_time"]
                                ? timingObj[dayString + "_out_time"]
                                : "";
                              if (inTime != "" && outTime != "") {
                                val =
                                  convertTo12Hour(inTime) +
                                  "-" +
                                  convertTo12Hour(outTime);
                              }
                            }

                            return <td>{val}</td>;
                          })}
                        <td>
                          <button onClick={() => editEm(employee.email)}>
                            Edit
                          </button>
                          <button
                            onClick={(e) => deleteEmployee(e, employee.email)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr className="edit-employee">
                        <td>
                          <span className="edit-field">
                            First name:{" "}
                            <input
                              name="fname"
                              onChange={handleEdit}
                              type="text"
                              value={editEmp.fname}
                            />
                          </span>
                          <span className="edit-field">
                            Last name:{" "}
                            <input
                              name="lname"
                              onChange={handleEdit}
                              type="text"
                              value={editEmp.lname}
                            />
                          </span>
                        </td>
                        <td>{employee.email}</td>
                        <td>
                          <span className="edit-field">
                            Phone:{" "}
                            <input
                              name="phone"
                              onChange={handleEdit}
                              type="text"
                              value={editEmp.phone}
                            />
                          </span>
                        </td>
                        <td>
                          <select
                            name="type"
                            onChange={handleEdit}
                            value={editEmp.type}
                          >
                            <option value="manager">manager</option>
                            <option value="employee">employee</option>
                          </select>
                        </td>
                  {!(clicked == "residents" || clicked == "visitors") &&
                        <td>{employee.department}</td>}
                        {!(clicked == "residents" && clicked == "visitors") &&
                          Weekdays.map((day, index) => {
                            let dayString = day.slice(0, 3).toLocaleLowerCase();
                            let additional_attributes =
                              employee.additional_attributes;
                            let inTime = "";
                            let outTime = "";
                            if (additional_attributes) {
                              let obj = JSON.parse(additional_attributes);
                              let timingObj = obj.timings;
                              inTime = timingObj[dayString + "_in_time"]
                                ? timingObj[dayString + "_in_time"]
                                : "";
                              outTime = timingObj[dayString + "_out_time"]
                                ? timingObj[dayString + "_out_time"]
                                : "";
                            }

                            return (
                              <td>
                                <span className="edit-field">
                                  In:{" "}
                                  <input
                                    className="w-25"
                                    key={"end_" + index}
                                    value={inTime}
                                    onChange={(e) => {
                                      let str = "";
                                      if (additional_attributes) {
                                        let obj = JSON.parse(
                                          additional_attributes
                                        );
                                        let timingObj = obj.timings;
                                        timingObj[dayString + "_in_time"] =
                                          e.target.value;
                                        obj.timings = timingObj;
                                        str = JSON.stringify(obj);
                                        employee.additional_attributes = str;
                                      } else {
                                        let ad_at = { timings: {} };
                                        ad_at.timings[dayString + "_in_time"] =
                                          e.target.value;
                                        str = JSON.stringify(ad_at);
                                        employee.additional_attributes = str;
                                      }

                                      handleAdditionalAttributeEdit(str);
                                    }}
                                    type="time"
                                  />
                                </span>
                                <span className="edit-field">
                                  Out:{" "}
                                  <input
                                    className="w-25"
                                    key={"end_" + index}
                                    value={outTime}
                                    onChange={(e) => {
                                      let str = "";
                                      if (additional_attributes) {
                                        let obj = JSON.parse(
                                          additional_attributes
                                        );
                                        let timingObj = obj.timings;
                                        timingObj[dayString + "_out_time"] =
                                          e.target.value;
                                        obj.timings = timingObj;
                                        str = JSON.stringify(obj);
                                        employee.additional_attributes = str;
                                      } else {
                                        let ad_at = { timings: {} };
                                        ad_at.timings[dayString + "_out_time"] =
                                          e.target.value;
                                        str = JSON.stringify(ad_at);
                                        employee.additional_attributes = str;
                                      }

                                      handleAdditionalAttributeEdit(str);
                                    }}
                                    type="time"
                                  />
                                </span>
                              </td>
                            );
                          })}
                        <td>
                          <button onClick={() => saveEmployee(employee.email)}>
                            Save
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
