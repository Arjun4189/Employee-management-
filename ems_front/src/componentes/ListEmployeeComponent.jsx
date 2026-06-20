import { useState, useEffect } from 'react'
import { deleteEmployee, listEmployees} from '../Services/EmployeeService';
import { useNavigate } from 'react-router-dom';

function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([])

  const navigator= useNavigate();

  useEffect(() => {
    getallemployees();
    
  }, [])

  function getallemployees(){
    listEmployees().then((response) => {
      setEmployees(response.data);
    }).catch(error => {
      console.error('Error fetching employees:', error);
    });
  }

  function addnewemployee(){
    navigator('/add-employee');
  }
 
  function updateEmployee(id){
    navigator(`update-employee/${id}`)

  }
  function removeEmployee(id){
    console.log(id);
    deleteEmployee(id).then((response)=>{
       getallemployees();

    }).catch(error=>{
      console.error(error);
    })

  }
  return (
    <div className='container'>
        <h2>List of Employees</h2>
        <div className='text-end'>
        <button type="button" className="btn btn-success " onClick={addnewemployee}>ADD EMPLOYEE</button><hr />
        </div>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>EmployeeID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstname}</td>
                        <td>{employee.lastname}</td>
                        <td>{employee.email}</td>
                        <td>
                          <button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button>
                          <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}
                            style={{marginLeft:'15px'}}>delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    

    </div>
  )
}

export default ListEmployeeComponent