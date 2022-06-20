import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Amplify, { API } from "aws-amplify";
// import awsExports from "../../aws-exports";
import Table from "./Table";
import { SearchContext } from "../../hooks/Context";

// Amplify.configure(awsExports);

const myAPI = "companyListingAPI";
const path = "/company";
const RSS = "companyListingAPI";
const RSSPath = "/get-all-rss-feed";
export default function Home() {
    const [company, setCompany] = useState([]);
    const [searchText, setSearchText] = useState()


    function searchData(){
        console.log(searchText)
        
    }

    const { setSearchInput } = useContext(SearchContext);

    function handleGetData() {
        API.get(myAPI, path)
            .then((response) => {
                console.log(response)
                setCompany(response.Items);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onSearchCompanyFeeds = () => {
        setSearchInput("cba")
    }


    return (
        <div className='App'>
            <div className='form-container'>
                <h1>Company Listing</h1>
                <div className='form'>
                    <div className='search-form'>
                        <input value={searchText}
                            onChange={(e)=>setSearchText(e.target.value)}
                            type='text'
                            placeholder='Search by Company Name'
                        />
                        <select type='Sector' placeholder='sector'>
                        <option value=''>Select</option>
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
                    </div>
                </div>
            </div>
            <section className="page-section">
                {company.length === 0 ?
                    '' :
                    <Table data={company} columns={COLUMNS} />
                }
            </section>
            {/* {company.length === 0 ?
                '' :
                <section className="page-section">
                    <Link to='/feeds'>
                        <button onClick={onSearchComapnyFeeds}>Detailed News Feed</button>
                    </Link>
                </section>
            } */}
            {/* TODO: TEST purpose */}
            
                <section className="page-section">
                    <Link to='/feeds'>
                        <button onClick={onSearchCompanyFeeds}>Detailed News Feed</button>
                    </Link>
                </section>
            


        </div>
    );
}

const COLUMNS = [{
    Header: 'Company Name',
    accessor: 'company_name'
}, {
    Header: 'Sector',
    accessor: 'sector'
}, {
    Header: 'Industry',
    accessor: 'industry'
}, {
    Header: 'Head Quaters',
    accessor: 'head_quaters'
}, {
    Header: 'Founded',
    accessor: 'founded'
}, {
    Header: 'Details',
    accessor: 'details'
}, {
    Header: 'ASX',
    accessor: 'ASX'
}, {
    Header: 'Revenue(mil)',
    accessor: 'revenue(mil)'
}, {
    Header: 'Budget(mil)',
    accessor: 'budget(mil)'
}
]
