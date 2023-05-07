import React, { useEffect, useState } from 'react';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlace(true);
        clearLocalShoppingCart();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        // Cart Data
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProduct);
    }, []);
    let thankYou;
    if(orderPlace) {
        thankYou = <img src={happyImage} alt="" />;
    }
    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(product => <ReviewItem key={product.key} removeProduct={removeProduct} product={product}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button className='main-button' onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;