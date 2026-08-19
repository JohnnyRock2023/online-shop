import Class from './CartHeader.module.css'

const CartHeader = ({setVisible}) => {
    return (
        <button className={Class.cartHeader} onClick={()=>{
            setVisible(true)
        }}></button>
    );
};

export default CartHeader;