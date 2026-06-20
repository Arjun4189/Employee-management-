import { Fragment } from 'react'
import ListEmployeeComponent from './componentes/ListEmployeeComponent'
import Header from './componentes/Header'
import Footer from './componentes/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Employee from './componentes/Employee'

function App() {
 

  return (
   <Fragment>
    <BrowserRouter>
    
    
      <Header />
      <Routes>
        {/* // http://localhost:5173 */}
        <Route path='/' element={<ListEmployeeComponent />}></Route>
      
        {/* // http://localhost:5173/employees */}
        <Route path='/employees' element={<ListEmployeeComponent />}></Route>

        {/* //http://localhost:5173/add-employee */}
        <Route path='/add-employee' element={<Employee />}></Route>


        {/* //http://localhost:5173/update-employee/1 */}
        <Route path='/update-employee/:id' element={<Employee />}></Route>

        </Routes>
      
      <Footer />
      
    
     </BrowserRouter>


   </Fragment>
  )
}

export default App
