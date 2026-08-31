import Class from "../App.module.css";
import Header from "../UI/Header/header";
import Footer from "../UI/Footer/Footer";
import CartProvider from "../Provider/cartProvider";
import UserProvider from "../Provider/userProvider";

const PageTemplate = ({children}) => {

    return (
        <div className={Class.App}>
            <UserProvider>
                <CartProvider>
                        <Header />
                        {children}
                        <Footer />
                </CartProvider>
            </UserProvider>
        </div>
    );
};

export default PageTemplate;