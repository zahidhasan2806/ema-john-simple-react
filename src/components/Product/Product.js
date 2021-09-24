import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';


const Product = (props) => {
    // console.log(props);
    const { name, img, price, seller, stock, star } = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: {price}</p>
                <p>only {stock} left in stock - order soon</p>
                <Rating readonly
                    initialRating={star}
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star" />
                <br />
                <button onClick={() => props.handleAddToCart(props.product)} className='purchase-btn'> {cartIcon} Add to cart</button>
            </div>
        </div>
    );
};

export default Product;