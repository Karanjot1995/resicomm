import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function ManagerHome(props) {

    const {boxData} = props;
    const [employees, setEmployees] = useState(props.employees)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [employee, setEmployee] = useState({
        id:'',
        fname:'',
        lname:'',
        email:'',
        phone:'',
    });

    const [editEmp, setEditEmp] = useState({
        id:'',
        email:'',
        fname:'',
        lname:'',
        phone:'',
    });

    const [edit, setEdit] = useState();

    // console.log(employees)

    // useEffect(() => {
    //     setEmployees(props.employees)
    //     console.log(props)
    // },[]);



    const handleOnChange = e => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const addEmployee = (e) =>{
        e.preventDefault();
        let emp = employee
        console.log(employee)
        // for(let emp in employees){
        //     if(emp.email!=)
        // }
        // emp.id = Object.keys(employees).length+1
        setEmployees((prev) => {
            return [ ...prev, emp];
        });
        // setEmployees(emps)
        // fetch('data/employees.json',{  
        //     method: 'POST',
        //     headers : { 
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(emps)
        // })
        // .then(res=>console.log(res))
    };

    const deleteEmployee = (e,email) => {
        e.preventDefault();
        let emps = employees;
        emps = emps.filter(emp=> emp.email!=email)
        setEmployees(emps)

    }

    const editEmployee = (email) => {
        let emp = {}
        employees.map(em=>{
            if(em.email ==email){
                emp = em
            }
        })
        setEdit(email)
        setEditEmp(emp);
        console.log(email)
    }

    const handleEdit = e => {
        const { name, value } = e.target;
        setEditEmp({ ...editEmp, [name]: value });
    };

    const saveEmployee = (email) => {
        let emp = {}
        let emps = employees
        emps.map(em=>{
            if(em.email ==email){
                em.fname = editEmp.fname;
                em.lname = editEmp.lname;
                em.phone = editEmp.phone
            }
        })
        setEmployees(emps)
        setEdit()
    }

    useEffect(() => {
        console.log(user)
        // let selected = window.location.pathname.replace("/", "");
        // setUserType(selected);
        // getEmployees().then(data=>{
        //   console.log(data)
        //   setEmployees(data.building)
        // })
    })

    return (
        <div className="container">
            <div class="main">
                <div className="box-container">
                    {boxData.map(box=><button className="button">{box.title}</button>)}
                </div>
                <div className="form-container">
                    <form className="left">
                        <div>
                            {/* <input name="id" onChange={handleID} value={employee.id}/> */}
                        </div>
                        <div>
                            <label>First Name</label>
                            <input name="fname" onChange={handleOnChange} type="text" value={employee.fname}/>
                        </div>

                        <div>
                            <label>Last Name </label>
                            <input name="lname" type="text" onChange={handleOnChange} value={employee.lname}/>
                        </div>
                        
                        <div>
                            <label for="" >Employee Email </label>
                            <input name="email" type="email" onChange={handleOnChange} value={employee.email}/>
                        </div>

                        <div>
                            <label>Phone Number</label>
                            <input name="phone" type="tel" onChange={handleOnChange} value={employee.phone}/>
                        </div>

                        <div className="form_action--button">
                            <input type="submit" onClick={addEmployee} value="submit"/>
                            <input type="reset" value="reset"/>
                        </div>  
                    </form>
                    <div className="right">
                        <table className="list" id="storeList">
                            <thead>
                                <tr>
                                    {/* <th>Employee Id</th> */}
                                    <th>Employee Name</th>
                                    <th>Employee Email</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            {/* {employees && employees.map(employee=>
                                <tr>
                                    <td>{employee.fname + ' ' + employee.lname}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td><button onClick={()=>editEmployee(employee.email)}>Edit</button><button onClick={(e)=>deleteEmployee(e,employee.email)}>Delete</button></td>
                                </tr>
                            )} */}
                            {employees && employees.map(employee=>
                                edit!==employee.email?
                                <tr>
                                    <td>{employee.fname + ' ' + employee.lname}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td><button onClick={()=>editEmployee(employee.email)}>Edit</button><button onClick={(e)=>deleteEmployee(e,employee.email)}>Delete</button></td>
                                </tr>
                                :
                                <tr className="edit-employee">
                                    <td>
                                        <span className="edit-field">First name: <input name="fname" onChange={handleEdit} type="text" value={editEmp.fname}/></span>
                                        <span className="edit-field">Last name: <input name="lname" onChange={handleEdit} type="text" value={editEmp.lname}/></span>
                                    </td>
                                    <td>{employee.email}</td>
                                    <td>                                       
                                        <span className="edit-field">Phone: <input name="phone" onChange={handleEdit} type="text" value={editEmp.phone}/></span>
                                    </td>
                                    <td><button onClick={()=>saveEmployee(employee.email)}>Save</button></td>
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

