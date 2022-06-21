import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Amplify, { API } from "aws-amplify";
// import awsExports from "../../aws-exports";
import Table from "./Table";
import { SearchContext } from "../../hooks/Context";
// Amplify.configure(awsExports);,

const myAPI = "restendpoint";
const searchPath = "/search";
const path = "/getCompany"

export default function Home() {
    const list = ['ABB Grain','ABC Learning','Ace Radio','Adam Internet','Aerosonde','AGL Energy','Alinta Gas','Allphones','Altium','Alumina Limited','Amcor','AMP','ANCA','Angus & Robertson','Ansarada','Ansell','Appliances Online','Aquila Shoes','Aristocrat Leisure','Arnotts Biscuits','Arrium','Arrow Research Corporation','Atlassian','Aurizon','Aussie Broadband','Austal','Austar','Austereo','Australia & New Zealand Banking Group (ANZ)','Australia Post','Australian Agricultural Company','Australian airExpress','Australian Airlines','Australian Broadcasting Corporation','Australian Defence Industries','Australian Ethical Investment','Australian Gas Light Company','Australian Motor Industries','Australian Pharmaceutical Industries','Australian Railroad Group','Australian Securities Exchange','ASC Pty Ltd','Ausway','AWB','Babcock & Brown','BAE Systems Australia','Bakers Delight','Bank of Queensland','Beaurepaires','Becker Entertainment','BHP','Billabong','Bing Lee','Biosis','BlueScope','Blundstone Footwear','Boags Brewery','Boost Juice Bars','Boral','Brambles','Brown Brothers Milawa Vineyard','Bulla Dairy Foods','Bunnings','Burns Philp','Camperdown Dairy International','Canva','CBH Group','Cbus','Chemeq','CHEP','CIMIC Group','CityRail','Clean Seas','CMV Group','Coca-Cola Amatil','Cochlear','Coles Group','Commonwealth Bank','Compare the Market Australia','Compass Resources','Computershare','ConnectEast','Cotton On','Country Energy','Crazy Johns','Crown Resorts','Crumpler','CSL','CSR','Darrell Lea','David Jones','De Bortoli Wines','Debt Mediators Australia','Delta Electricity','Dick Smith Electronics','Dick Smith Foods','Dorf Clark Industries','Downer Group','Driza-Bone','Dymocks','Eagle Boys','Eftel','Elders','Elfin Cars','Employsure','Energex','EnergyAustralia','EnviroMission','Eraring Energy','Ergon Energy','Esanda','Event Hospitality & Entertainment','Fairfax Media','Flight Centre','Florigene','Foodland Supermarkets','Fortescue Metals Group','Fosters Group','Foxtel','Franklins','Freehand Group','GMHBA','Golden North','Goodman Fielder','Grocon','Gunns','GWA International','Haighs Chocolates','Halfbrick Studios','Harvey Norman','Healthscope','Henry Jones IXL','HIH Insurance','Holden Special Vehicles','Holden','Honeysuckle Development Corporation','Huon Aquaculture','IGA','iiNet','Incat','Incitec Pivot','Insurance Australia Group','Internode','IOOF','IQnovate','JB Hi-Fi','Jetstar','Kangaroo Bus Lines','Kennedy Nolan','Kleenmaid','Kogan.com','LJ Hooker','Lanka Graphite','Leading Edge Group','Lendlease','Lend Lease Retirement Living','Lion','Lowes Menswear','MAB Corporation','Macquarie Atlas Roads','Macquarie Group','Maton','McGrath Estate Agents','Mediapoint','Melbourne IT','Meriton','Metal Storm','Mirvac','Multiplex','Murrays','Myer','MYOB','Nash Timbers','National Australia Bank','National Storage','Navitas','Netbox Blue','Network 10','Newcastle Port Corporation','Newcrest','Nine Network','Nufarm','Octaviar','Office National','Officeworks','Oneflare','Openn','Oporto','Optus','Orbital Corporation','Orica','Origin Energy','Orocobre','Pacific Star Network','Patrick Corporation','People Telecom','Peter Lehmann Wines','PIPE Networks','Promina Group','Qantas','Queensland Rail','Rail Infrastructure Corporation','Ramsay Health Care','Red Rooster','Redbubble','Rinker Group','Rio Tinto','Rip Curl','RÃ¸de Microphones','Roy Morgan Research','Sanitarium Health and Wellbeing Company','Santos','Sausage Software','Scentre Group','Searle x Waldron','Seven Network','Sigma Pharmaceuticals','Sidney Cooke','Sino Gold Mining','Slater & Gordon','Smorgon Steel','Snowy Hydro','Southern & Silverton Rail','SPC Ardmona','Special Broadcasting Service','St George Bank','Stanwell Corporation','Star Entertainment Group','Sting Sports','Suncorp','Sunland Group','Sydney Ferries','Sydney Water','Tabcorp','Target Australia','Tarocash','Tatts Group','TechnologyOne','Telstra','Tenix Defence','Tip Top Bakeries','Toll Group','Torus Games','TPG Telecom','Transperth','Transurban','UGL Limited','Vero Insurance','Vicinity Centres','Village Cinemas','Village Roadshow','Virgin Australia','Visual Obsession','Wattyl','Webjet','Wesfarmers','Westnet','Westpac','Wine Selectors','Winning Appliances','Woods Bagot','Woodside Petroleum','Woolworths','Worley','Zinifex'];
    const [company, setCompany] = useState([]);
    const [searchText, setSearchText] = useState('')
    const { setSearchInput } = useContext(SearchContext);


    function searchData(){
        const myInit = {
            body: {
              cname:searchText
            }
          };

        API.post(myAPI, searchPath, myInit)
            .then((response) => {
                console.log(response)
                setCompany(response.Items);
            })
            .catch((error) => {
                console.log(error);
            });
        }
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
    function deciderFunction(){
        setCompany('')
        if(searchText === ''){
            handleGetData()
        }else{
            searchData()
        }
    }



    const searchFeed = () => {
        setSearchInput("") 
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
                        <button onClick={deciderFunction}>Get Data</button>
                    </div>
                </div>
            </div>
            <section className="page-section">
                {company.length === 0 ?
                    '' :
                    <Table data={company} columns={COLUMNS} />
                }
            </section>
            {company.length === 0 ?
                '' :
                <section className="page-section">
                    <Link to='/feeds'>
                        <button  className="update" onClick={searchFeed}>Detailed News Feed</button>
                    </Link>
                </section>
            }
            
            


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
