import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";


function App() {
    return (
        <div className='App'>
            <Router>
                <Header/>
                <main>
                    <Routes>
                        <Route exact path='/'  element={<Home/>}/>
                        <Route path='/home' element={<Home/>} />
                        <Route path='/feeds' element={<Feed/>}  />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
