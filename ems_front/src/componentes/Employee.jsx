import { useEffect, useState } from "react"
import { createEmployee, getEmployee, updateEmployee } from "../Services/EmployeeService";
import { useNavigate,useParams } from "react-router-dom";

function Employee() {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
     const{ id }=useParams();

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
    })

    const navigator = useNavigate();
   useEffect(()=>{
    getEmployee(id).then((response)=>{
        setfirstname(response.data.firstname);
        setlastname(response.data.lastname);
        setemail(response.data.email);
    }).catch(error=>{
        console.error(error);
    }
    )

   },[id])

    function pagetitle(){
        if(id){
            return <h2 className="text-center">UPDATE Employee</h2>
        }
        else{
            return <h2 className="text-center">Add Employee</h2>
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (validateform()) {


            const employee = { firstname, lastname, email };
            console.log(employee);

            if(id){
                updateEmployee(id, employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator('/employees')
            }).catch(error=>{
                console.error(error);
            })

            }

            
        }
    }

    function validateform() {
        let valid = true;

        const errorcopy = { ...errors }

        if (firstname.trim()) {
            errorcopy.firstname = '';
        }
        else {
            errorcopy.firstname = 'firstname is required';
            valid = false;
        }


        if (lastname.trim()) {
            errorcopy.lastname = '';
        }
        else {
            errorcopy.lastname = 'lastname is required';
            valid = false;
        }

        if (email.trim()) {
            errorcopy.email = '';
        }
        else {
            errorcopy.email = 'email is required';
            valid = false;
        }

        setErrors(errorcopy);
        return valid;
    }

    return (
        <div>
            <div className="container">
                <br /> <br />
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            pagetitle()
                        }
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label className="form-label">First name</label>
                                <input
                                    type="text"
                                    placeholder="enter the employee first name"
                                    name="firstName"
                                    value={firstname}
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setfirstname(e.target.value)}
                                />{errors.firstname &&<div className="invalid-feedback">{errors.firstname}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Last name</label>
                                <input
                                    type="text"
                                    placeholder="enter the employee last name"
                                    name="lastName"
                                    value={lastname}
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setlastname(e.target.value)}
                                />{errors.lastname &&<div className="invalid-feedback">{errors.lastname}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    placeholder="enter the employee email"
                                    name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setemail(e.target.value)}
                                />{errors.email &&<div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <button className="btn btn-success " type="submit">
                                    Submit <br />
                                </button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee;