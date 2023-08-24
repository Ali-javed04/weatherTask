import Header from '../header/header';
import Footer from '../footer/footer';
import Home from '../home/home';
import React, { useEffect } from 'react';
import { BrowserRouter as Router,Switch, Route ,Routes,Redirect,Navigate} from 'react-router-dom';


const Main = () => {

  
  return (
    <>
    <div>
    <Router>
        <Header/>
        <Routes>
        <Route path='/'  element={<Home/>}
        />
        </Routes>
        <Footer/>
        </Router>
    </div>


      
    </>
  )
}

export default Main
