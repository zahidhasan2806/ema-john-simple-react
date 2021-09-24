import React, { useEffect, useState } from 'react';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setSearchedProduct(data)
            })
    }, [])

    useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }

            }
            setCart(storedCart);
        }
    }, [products])

    const handleAddToCart = product => {
        const newCart = [...cart, product];
        setCart(newCart);
        //save to local storage for now
        addToDb(product.key);
    }
    const handleSearch = event => {
        const searchText = event.target.value;
        const requiredProduct = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedProduct(requiredProduct);

    }

    return (
        <div>
            <div className='search-container'>
                <input onChange={handleSearch} placeholder='search product' type="text" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        searchedProduct.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;