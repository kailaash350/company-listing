import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import awsExports from "./aws-exports";
import Amplify, { API } from 'aws-amplify'
Amplify.configure(awsExports);

const myAPI = "companyListingAPI"
const path = '/company'; 





function App() {
  const [company, setCompany] = useState([])

  function handleGetData(e) {
    e.preventDefault();
    API.get(myAPI,path)
    .then(response => {
      console.log(response.Items)
      setCompany(response.Items)
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      
      <div className='form-container'>
    <h1>Company Listing</h1>
    <div className="form">
    <form className="search-form">
      <input type="text" placeholder="search by company name"/>
      <select type="Sector" placeholder="sector">
        <option value='Software'>Software</option>
        <option value='Consumer Finance'>Consumer Finance</option>
        <option value='Retail'>Retail</option>
        <option value='Health'>Health</option>
        <option value='Banking'>Banking</option>
        <option value='Insuranace'>Insuranace</option>
      </select>
    <button onClick={handleGetData}>Get Data</button>
    </form>
    </div>
    </div>
        <table>
  <tr>
    <th>Company</th>
    <th>Sector</th>
    <th>Industry</th>
    <th>Head_Quaters</th>
    <th>Founded</th>
    <th>Details</th>

  </tr>
 { company.map(row =>{
   return(
    <tr>
      <td>{row.cmpy_name}</td>
      <td>{row.sector}</td>
      <td>{row.industry}</td>
      <td>{row.head_quaters}</td>
      <td>{row.founded}</td>
      <td>{row.details}</td>
    </tr>
   )
 })
    }
      </table>
    </div>
  );
}

export default App;
