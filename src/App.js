import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
// import awsExports from "./aws-exports";
import Amplify, { API } from "aws-amplify";
// Amplify.configure(awsExports);
import Home from "./components/Home/Home";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import { SearchContext } from "./hooks/Context";

function App() {
    const [searchInput, setSearchInput] = useState("");
    
    return (
        <div className='App'>
            <Router>
                <SearchContext.Provider value={{ searchInput, setSearchInput }}>
                    <Header name='TCS' />
                    <main>
                        <Routes>
                            <Route exact path='/'  element={<Home/>}/>
                            <Route path='/home' element={<Home/>} />
                            <Route path='/feeds' element={<Feed/>} />
                        </Routes>
                    </main>
                </SearchContext.Provider>
            </Router>
        </div>
    );
}

export default App;
