import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Header from "./UI/Header/header";
import CartProvider from "./Provider/cartProvider";
import Footer from "./UI/Footer/Footer";
import UserProvider from "./Provider/userProvider";
import Class from './App.module.css'
import Products from "./UI/Body/Products/Products";
import Product from "./UI/Body/Product/Product";
import Profile from "./UI/Body/Profile/Profile";
import Login from "./UI/Body/Login/Login";
import Admin from "./UI/Body/Admin/Admin";

function SignUp() {
    return null;
}

const App = () => {
    return (
        <div className={Class.App}>
            <BrowserRouter>
                <UserProvider>
                    <CartProvider>
                        <Header/>
                            <Routes>
                                <Route exact path='/' element={<Products/>} />
                                <Route exact path='/items/:id' element={<Product/>} />
                                <Route path='/profile' element={<Profile/>} />
                                <Route path='/auth/login' element={<Login/>} />
                                <Route path='/auth/signup' element={<SignUp/>} />
                                <Route path='/admin' element={<Admin/>}/>
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        <Footer />
                    </CartProvider>
                </UserProvider>
            </BrowserRouter>
        </div>
    );
};


export default App;