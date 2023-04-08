import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addEmployee, editEmployee } from "../../services/services";
import { validateEmail, validateFirstName, validateLastName, validatePassword, validatePhone } from "./validate";

function ManagerHome(props) {

    const {boxData} = props;
    const [employees, setEmployees] = useState(props.employees)
    const [errMsgs, setErrMsgs] = useState({})
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [employee, setEmployee] = useState({
        fname:'',
        lname:'',
        email:'',
        phone:'',
        password:''
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

    const addEmp = (e) =>{
        e.preventDefault();
        let valid = true;
        let emp = employee
        emp.type = 'employee';
        emp.department = user.department;
        for (const key in errMsgs) {
            if(errMsgs[key]){
              valid = false
            }
        }
        if(!emp.email || !emp.password || !emp.fname || !emp.lname || !emp.phone){
            alert('All fields marked with * are mandatory!')
        }else{
            if(valid){
                addEmployee(emp).then(res=> {
                    if(res.status==200){
                       alert(res.message)
                       window.location.href = 'dashboard';
                    }
                })
            }
        }
    };

    const deleteEmployee = (e,email) => {
        e.preventDefault();
        let emps = employees;
        emps = emps.filter(emp=> emp.email!=email)
        setEmployees(emps)

    }

    const editEm = (email) => {
        let emp = {}
        employees.map(em=>{
            if(em.email ==email){
                emp = em
            }
        })
        setEdit(email)
        setEditEmp(emp);
    }

    const handleEdit = e => {
        const { name, value } = e.target;
        setEditEmp({ ...editEmp, [name]: value });
    };

    const saveEmployee = (email) => {
        let emp = {}
        let emps = employees
        console.log(editEmp)
        editEmployee(editEmp).then(res=>{
            if(res.status==200){
                alert(res.message)
                window.location.reload(true);
            }
        })
        // emps.map(em=>{
        //     if(em.email ==email){
        //         em.fname = editEmp.fname;
        //         em.lname = editEmp.lname;
        //         em.phone = editEmp.phone
        //     }
        // })
        // setEmployees(emps)
        // setEdit()
    }

    useEffect(() => {
        // let selected = window.location.pathname.replace("/", "");
        // setUserType(selected);
        // getEmployees().then(data=>{
        //   console.log(data)
        //   setEmployees(data.building)
        // })
    })

    return (
        <div className="container">
            <div className="main">
                <div className="box-container">
                    {boxData.map(box=><button className="button">{box.title}</button>)}
                </div>
                <div className="form-container">
                    <form className="left">
                        <div className="add-emp-inp">
                            <label>First Name</label>
                            <input name="fname" onChange = { (e) => validateFirstName(e, setEmployee, employee, errMsgs, setErrMsgs)} type="text" value={employee.fname}/>
                            <p className="error-msg">{errMsgs['fname']?errMsgs['fname']:''}</p>
                        </div>

                        <div className="add-emp-inp">
                            <label>Last Name </label>
                            <input name="lname" type="text" onChange = { (e) => validateLastName(e, setEmployee, employee, errMsgs, setErrMsgs)} value={employee.lname}/>
                            <p className="error-msg">{errMsgs['lname']?errMsgs['lname']:''}</p>
                        </div>
                        
                        <div className="add-emp-inp">
                            <label htmlFor="" >Employee Email </label>
                            <input name="email" type="email" onChange = { (e) => validateEmail(e, setEmployee, employee, errMsgs, setErrMsgs)} value={employee.email}/>
                            <p className="error-msg">{errMsgs['email']?errMsgs['email']:''}</p>
                        </div>

                        <div className="add-emp-inp">
                            <label>Phone Number</label>
                            <input name="phone" type="number" onChange = { (e) => validatePhone(e, setEmployee, employee, errMsgs, setErrMsgs)} value={employee.phone}/>
                            <p className="error-msg">{errMsgs['phone']?errMsgs['phone']:''}</p>
                        </div>

                        <div className="add-emp-inp">
                            <label>Password</label>
                            <input name="password" type="text" onChange = { (e) => validatePassword(e, setEmployee, employee, errMsgs, setErrMsgs)} value={employee.password}/>
                            <p className="error-msg">{errMsgs['password']?errMsgs['password']:''}</p>
                        </div>

                        <div className="form_action--button">
                            <input type="submit" onClick={addEmp} value="submit"/>
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
                                    <td><button onClick={()=>editEm(employee.email)}>Edit</button><button onClick={(e)=>deleteEmployee(e,employee.email)}>Delete</button></td>
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

