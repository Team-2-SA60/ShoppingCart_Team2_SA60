import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import {Container, Button} from 'reactstrap';
import api from '../../utilities/axios';
import './CartDetails.css';
import ListCartItem from "./ListCartItem";
import ListCartPrice from './ListCartPrice';
import AppNavbar from '../AppNavbar';

export default function CartDetails() {
    const [cartItems, setCartItems] = useState([]);
    const { checkSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        getCustomer();
        fetchCart();
    }, []);

    async function getCustomer() {
        const getCustomer = await checkSession();
        if (!getCustomer) navigate("/login");
    }

    async function fetchCart() {
        try {
            const response = await api.get("/cart")
            setCartItems(response.data);
        } catch (err) {
            console.error("Failed to fetch cart items", err);
        }
    }

    function updateQuantity (id, updateFn) {
        setCartItems(previous => previous.map(item => {
            if (item.id === id) {
                const newQuantity = updateFn(item.quantity);
                return { ...item, quantity: Math.min(99, Math.max(1, newQuantity)) };
            }
            return item;
        }));
    }

    function handleAddItemQty(id) {
        updateQuantity(id, quantity => quantity + 1);
        api.put(`cart/addQty/${id}`)
            .then(() => {
                console.log('+1 quantity to item');
            })
            .catch(error => console.error('Error: ', error));
    }

    function handleMinusItemQty(id) {
        updateQuantity(id, quantity => quantity - 1);

        api.put(`cart/minusQty/${id}`)
            .then(() => {
            console.log('-1 quantity from item');
            })
            .catch(error => console.error('Error: ', error));
    }

    //function to handle form input to setQty
    function handleSetItemQty(id, newQty) {
        updateQuantity(id, () => newQty);
        api.put(`cart/setQty/${id}`, {
            qty : newQty
        })
            .then(() => {
                console.log('Changed quantity of item');
            })
            .catch(error => console.error('Error: ', error));
    }

    function handleDeleteItem(id) {
        api.delete(`cart/delete/${id}`)
            .then(()=>{
                console.log('Item deleted');
                setCartItems(cartItems.filter(item => item.id !== id));
                checkSession();
            })
            .catch(error => console.error('Error: ', error));
    }

    return(
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
                        <ListCartItem cartItems={cartItems} handleAddItemQty={handleAddItemQty} handleMinusItemQty={handleMinusItemQty} handleSetItemQty={handleSetItemQty} handleDeleteItem={handleDeleteItem}/>
                        <ListCartPrice cartItems={cartItems} />
                    </div>
                )}
            </Container>
        </div>
    )

};