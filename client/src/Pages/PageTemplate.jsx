import Class from "../App.module.css";
import Header from "../UI/Header/header";
import Footer from "../UI/Footer/Footer";
import CartProvider from "../Provider/cartProvider";

const PageTemplate = ({children}) => {

    return (
        <div className={Class.App}>
            <CartProvider>
                    <Header />
                    {children}
                    <Footer />
            </CartProvider>
        </div>
    );
};

export default PageTemplate;