import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import './CartDetails.css'
import AppNavbar from '../components/AppNavbar';
import api from '../utilities/axios';

const CartDetails = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        api.get("/cart")
            .then(res => {
                console.log("Fetched cart items:", res.data);
                setCartItems(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch cart items", err);
            });
    }, []);

        const calculateSubtotal = () => {
            return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0).toFixed(2);
        };


        return (
            <div>
                <AppNavbar/>
                <Container className="cart-container">
                    <h1 className="text-3xl mt-5">My Cart ({cartItems.length})</h1>
                    {cartItems.length === 0 ? (
                        <div>
                            <p>Cart is Empty</p>
                            <Button tag="a" href="/" color="primary">Continue Browsing</Button>
                        </div>
                    ) : (
                        <div className="cart-content">
                            <div className="cart-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <img src={`./images/${item.productImage}`} alt={item.productName}
                                             className="cart-item-image"/>
                                        <div className="cart-item-details">
                                            <h2>{item.productName}</h2>
                                            <p>{item.productDescription}</p>
                                            <p>${item.unitPrice.toFixed(2)}</p>
                                        </div>
                                        <div className="cart-item-quantity">
                                                <button
                                                    className="border-black border w-6 rounded-l-md bg-red-200 text-black align-middle">
                                                    <b>-</b>
                                                </button>
                                                <input type="text"
                                                       className="border-black border-t border-b white w-10 focus:outline-none text-center"/>
                                                <button
                                                    className="border-black border w-6 rounded-r-md bg-green-200 text-black align-middle">
                                                    <b>+</b>
                                                </button>
                                        </div>
                                        <Button color="danger" className="remove-button">X</Button>
                                    </div>
                                ))}
                                <Button tag="a" href="/" color="primary">Continue Browsing</Button>
                            </div>
                            <div className="summary">
                                <h2>Summary</h2>
                                <hr/>
                                <p>Sub-total: ${calculateSubtotal()}</p>
                                <Button color="primary" className="checkout-button">Check Out</Button>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        );
}
export default CartDetails;
