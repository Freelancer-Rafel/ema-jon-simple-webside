import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, quantity, key } = props.product;
    return (
        <div className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity {quantity}</p>
            <br />
            <button className='main-button' onClick={() => props.removeProduct(key)}>remove</button>
        </div>
    );
};

export default ReviewItem;