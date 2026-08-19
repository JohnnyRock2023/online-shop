import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Items from "./Pages/Items";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Item from "./Pages/Item";
import Admin from "./Pages/Admin";


const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route exact path='/items' element={<Items/>} />
                    <Route exact path='/items/:id' element={<Item/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/cart' element={<Profile/>} />
                    <Route path='auth/login' element={<Login/>} />
                    <Route path='auth/signup' element={<SignUp/>} />
                    <Route path='/admin' element={<Admin/>}/>
                </Routes>
            </BrowserRouter>
    );
};

export default App;