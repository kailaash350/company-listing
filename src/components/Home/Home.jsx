import React, { useState, useContext,useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import  { API } from "aws-amplify";
import TblComponent from "./TblComponent";
import { SearchContext } from "../../hooks/Context";



// import awsExports from "../../aws-exports";
// Amplify.configure(awsExports);,

const myAPI = "restendpoint";
const searchPath = "/search";
const path = "/getCompany"
 function Home() {
    const list = ['ABB Grain','ABC Learning','Ace Radio','Adam Internet','Aerosonde','AGL Energy','Alinta Gas','Allphones','Altium','Alumina Limited','Amcor','AMP','ANCA','Angus & Robertson','Ansarada','Ansell','Appliances Online','Aquila Shoes','Aristocrat Leisure','Arnotts Biscuits','Arrium','Arrow Research Corporation','Atlassian','Aurizon','Aussie Broadband','Austal','Austar','Austereo','Australia & New Zealand Banking Group (ANZ)','Australia Post','Australian Agricultural Company','Australian airExpress','Australian Airlines','Australian Broadcasting Corporation','Australian Defence Industries','Australian Ethical Investment','Australian Gas Light Company','Australian Motor Industries','Australian Pharmaceutical Industries','Australian Railroad Group','Australian Securities Exchange','ASC Pty Ltd','Ausway','AWB','Babcock & Brown','BAE Systems Australia','Bakers Delight','Bank of Queensland','Beaurepaires','Becker Entertainment','BHP','Billabong','Bing Lee','Biosis','BlueScope','Blundstone Footwear','Boags Brewery','Boost Juice Bars','Boral','Brambles','Brown Brothers Milawa Vineyard','Bulla Dairy Foods','Bunnings','Burns Philp','Camperdown Dairy International','Canva','CBH Group','Cbus','Chemeq','CHEP','CIMIC Group','CityRail','Clean Seas','CMV Group','Coca-Cola Amatil','Cochlear','Coles Group','Commonwealth Bank','Compare the Market Australia','Compass Resources','Computershare','ConnectEast','Cotton On','Country Energy','Crazy Johns','Crown Resorts','Crumpler','CSL','CSR','Darrell Lea','David Jones','De Bortoli Wines','Debt Mediators Australia','Delta Electricity','Dick Smith Electronics','Dick Smith Foods','Dorf Clark Industries','Downer Group','Driza-Bone','Dymocks','Eagle Boys','Eftel','Elders','Elfin Cars','Employsure','Energex','EnergyAustralia','EnviroMission','Eraring Energy','Ergon Energy','Esanda','Event Hospitality & Entertainment','Fairfax Media','Flight Centre','Florigene','Foodland Supermarkets','Fortescue Metals Group','Fosters Group','Foxtel','Franklins','Freehand Group','GMHBA','Golden North','Goodman Fielder','Grocon','Gunns','GWA International','Haighs Chocolates','Halfbrick Studios','Harvey Norman','Healthscope','Henry Jones IXL','HIH Insurance','Holden Special Vehicles','Holden','Honeysuckle Development Corporation','Huon Aquaculture','IGA','iiNet','Incat','Incitec Pivot','Insurance Australia Group','Internode','IOOF','IQnovate','JB Hi-Fi','Jetstar','Kangaroo Bus Lines','Kennedy Nolan','Kleenmaid','Kogan.com','LJ Hooker','Lanka Graphite','Leading Edge Group','Lendlease','Lend Lease Retirement Living','Lion','Lowes Menswear','MAB Corporation','Macquarie Atlas Roads','Macquarie Group','Maton','McGrath Estate Agents','Mediapoint','Melbourne IT','Meriton','Metal Storm','Mirvac','Multiplex','Murrays','Myer','MYOB','Nash Timbers','National Australia Bank','National Storage','Navitas','Netbox Blue','Network 10','Newcastle Port Corporation','Newcrest','Nine Network','Nufarm','Octaviar','Office National','Officeworks','Oneflare','Openn','Oporto','Optus','Orbital Corporation','Orica','Origin Energy','Orocobre','Pacific Star Network','Patrick Corporation','People Telecom','Peter Lehmann Wines','PIPE Networks','Promina Group','Qantas','Queensland Rail','Rail Infrastructure Corporation','Ramsay Health Care','Red Rooster','Redbubble','Rinker Group','Rio Tinto','Rip Curl','RÃ¸de Microphones','Roy Morgan Research','Sanitarium Health and Wellbeing Company','Santos','Sausage Software','Scentre Group','Searle x Waldron','Seven Network','Sigma Pharmaceuticals','Sidney Cooke','Sino Gold Mining','Slater & Gordon','Smorgon Steel','Snowy Hydro','Southern & Silverton Rail','SPC Ardmona','Special Broadcasting Service','St George Bank','Stanwell Corporation','Star Entertainment Group','Sting Sports','Suncorp','Sunland Group','Sydney Ferries','Sydney Water','Tabcorp','Target Australia','Tarocash','Tatts Group','TechnologyOne','Telstra','Tenix Defence','Tip Top Bakeries','Toll Group','Torus Games','TPG Telecom','Transperth','Transurban','UGL Limited','Vero Insurance','Vicinity Centres','Village Cinemas','Village Roadshow','Virgin Australia','Visual Obsession','Wattyl','Webjet','Wesfarmers','Westnet','Westpac','Wine Selectors','Winning Appliances','Woods Bagot','Woodside Petroleum','Woolworths','Worley','Zinifex'];
    const [company, setCompany] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [searchList, setsearchList] = useState([]);
    const [show, setshow] = useState(false)
    const { setSearchInput } = useContext(SearchContext);
    const focusButton = useRef();
    let nameList=[]

useEffect(() => {
    if(focusButton.current) focusButton.current.focus();
}, [focusButton])

function onEnterPress(e) {
    if(e.code == 'Enter'){
      deciderFunction(e)
    }
  }

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
                    setSearchText('')
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    function deciderFunction(e){
        console.log(nameList)
        e.preventDefault();
        setCompany('')
        if(searchText === ''){
            handleGetData()
        }else{
            searchData()
        }
    }

const getDiv = (e)=>{
    setshow(false)
    console.log(e.target.textContent)
   setSearchText(e.target.textContent);
   searchData();
}

// local search
 function searchFeed(e){
    setSearchInput('')
     setshow(true)
    setSearchText(e.target.value)
    var sList = list.filter(item => {
        return(
            item.toLowerCase().match(e.target.value.toLowerCase())
        )
    })
    setsearchList(sList)
 }


    return (
        <div className='App' onClick={()=>setshow(false)}>
            <div className='form-container' >
                <h1>Company Listing</h1>
                <div className='form'>
                    <div className='search-form'>
            <form onSubmit={deciderFunction}>

                        <input value={searchText}
                            onChange={searchFeed}
                            type='text'
                            placeholder="Search by Company Name"
                            onKeyDown={onEnterPress}
                        >
                        </input>                           

                        {show === false?'':
                        <div className="auto-div-container">
                        {searchList.map((i) =>(
                                <div className="auto-div" key={i} value={i} onClick={((e) => getDiv(e, i))}>{i}</div>
                        )
                        )
                        }
                        </div>

                        }
                        
                        {/* <select type='Sector' placeholder='sector'>
                        <option value=''>Select</option>
                            <option value='Software'>Software</option>
                            <option value='Consumer Finance'>
                                Consumer Finance
                            </option>
                            <option value='Retail'>Retail</option>
                            <option value='Health'>Health</option>
                            <option value='Banking'>Banking</option>
                            <option value='Insuranace'>Insuranace</option>
                        </select> */}
                        <button type="submit" ref={focusButton}>Get Data</button>
            </form>
                    </div>
                </div>
            </div>
            <section className="page-section">
                {company.length === 0 ?
                    <h1>No records Avaliable</h1>:
                    <TblComponent data={company} columns={COLUMNS} />
                }
            </section>
            {company.length === 0 ?
                '' :
                <section className="page-section">
                    <Link to='/feeds'>
                        <button className="ui primary button ">Detailed News Feed</button>
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
},  {
    Header: 'ASX',
    accessor: 'ASX'
}, {
    Header: 'Revenue $AUD (Mil)',
    accessor: 'revenue'
}, {
    Header: 'Budget $AUD (Mil)',
    accessor: 'budget'
},{
    Header: 'Founded',
    accessor: 'founded'
}, {
    Header: 'Details',
    accessor: 'details'
}

]

export default Home;