import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import DataProvider from "./context/DataProvider";
//components
import Login from "./components/Account/Login";
import Home from "./components/Home/Home";
import Header from './components/Header/Header'
import CreatePost from "./components/Create/CreatePost";
import DetailView from "./components/Detail/DetailView";
import Update from "./components/Create/Update/Update";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";


const PrivateRoute = ({isAuthenticated, ...props}) => {
  return isAuthenticated ? 
  <>
  <Header/>
  <Outlet/>
  </> :
  <Navigate replace to="/login" />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false)
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update/>} />
            </Route>
            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>
            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
