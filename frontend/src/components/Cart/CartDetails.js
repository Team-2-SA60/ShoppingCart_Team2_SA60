import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import {Button} from 'reactstrap';
import api from '../../utilities/axios';
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
            .catch(error => console.error('Error: ', error));
    }

    function handleMinusItemQty(id) {
        updateQuantity(id, quantity => quantity - 1);

        api.put(`cart/minusQty/${id}`)
            .catch(error => console.error('Error: ', error));
    }

    //function to handle form input to setQty
    function handleSetItemQty(id, newQty) {
        updateQuantity(id, () => newQty);
        api.put(`cart/setQty/${id}`, {
            qty : newQty
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
        <div className="min-h-screen">
            <AppNavbar />
            <div className="container mx-auto px-4 py-5 min-w-[600px]">
                <h1 className="text-3xl font-bold mt-2.5 mb-2.5">My Cart ({cartItems.length})</h1>
                {cartItems.length === 0 ? (
                    <div className="text-left py-10">
                        <p className="text-lg mb-4">Your cart is empty</p>
                        <Button
                            tag="a"
                            href="/"
                            color="primary"
                            className="px-6 py-2 rounded-lg font-medium"
                        >
                            Continue Browsing
                        </Button>
                    </div>
                )
                :
                (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3 ">
                            <ListCartItem cartItems={cartItems} handleAddItemQty={handleAddItemQty} handleMinusItemQty={handleMinusItemQty} handleSetItemQty={handleSetItemQty} handleDeleteItem={handleDeleteItem}
                            />
                        </div>
                        <div className="lg:w-1/3">
                            <ListCartPrice cartItems={cartItems} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

};