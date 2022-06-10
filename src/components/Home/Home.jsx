import React, { useEffect, useState, useMemo } from "react";
import "./Home.css";
import Amplify, { API } from "aws-amplify";
import awsExports from "../../aws-exports";
import Table from "./Table";
Amplify.configure(awsExports);

const myAPI = "companyListingAPI";
const path = "/company";

function Home() {
    const [company, setCompany] = useState([]);

   
    function handleGetData(e) {
        e.preventDefault();
        API.get(myAPI, path)
        .then((response) => {
            console.log(response.Items);
            setCompany(response.Items);
        })
        .catch((error) => {
            console.log(error);
        });
    }
   

    return (
        <div className='App'>
            <div className='form-container'>
                <h1>Company Listing</h1>
                <div className='form'>
                    <form className='search-form'>
                        <input
                            type='text'
                            placeholder='search by company name'
                        />
                        <select type='Sector' placeholder='sector'>
                            <option value='Software'>Software</option>
                            <option value='Consumer Finance'>
                                Consumer Finance
                            </option>
                            <option value='Retail'>Retail</option>
                            <option value='Health'>Health</option>
                            <option value='Banking'>Banking</option>
                            <option value='Insuranace'>Insuranace</option>
                        </select>
                        <button onClick={handleGetData}>Get Data</button>
                    </form>
                </div>
            </div>
            <section className="page-section">

            <Table data={company} columns={COLUMNS}/>
            </section>
            
        </div>
    );
} 

const COLUMNS = [{
    Header:'Company Name',
    accessor:'company_name'
},{
    Header:'Sector',
    accessor:'sector'
},{
    Header:'Industry',
    accessor:'industry'
},{
    Header:'Head Quaters',
    accessor:'head_quaters'
},{
    Header:'Founded',
    accessor:'founded'
},{
    Header:'Details',
    accessor:'details'
},{
    Header:'ASX',
    accessor:'ASX'
}
]
export default Home;
