import React, { useEffect, useState } from 'react';
import { useSession} from "../context/SessionContext";
import {useNavigate} from "react-router-dom";
import api from "../utilities/axios";
import AppNavbar from "../components/AppNavbar";

const Checkout = () => {

    const { checkSession } = useSession();
    const navigate = useNavigate();
    const [cartDetails, setCartDetails] = useState([]);

    useEffect(() => {
        getCustomer();
        api.get("/checkout")
            .then(res => {
                setCartDetails(res.data);
            })
            .catch(res => {
                console.log("Error fetching cart", res);
            })
    }, []);

    async function getCustomer() {
        const customer = await checkSession();
        if (!customer) navigate("/login");
    }

    const calculateSubtotal = () => {
        if (!cartDetails) return 0;
        return cartDetails.reduce((total, item) => {
            return total + (item.quantity) * (item.unitPrice);
        }, 0);
    };

    const gridClass = 'grid grid-rows-${cartDetails.length} grid-cols-3';

    const cartList = cartDetails.map(cartItem => {
        return (
            <div key={cartItem.id} className={gridClass}>
                <div>{cartItem.productName}</div>
                <div>{cartItem.quantity}</div>
                <div>{cartItem.unitPrice}</div>
            </div>
        )
    });

    // HTML render
    if (cartDetails.length === 0) {
        return (
            <div>
                <AppNavbar/>
                <div className="p-4">Your cart is empty!</div>
            </div>
        )
    }

    return (
        <div>
            <AppNavbar/>
            <div className="grid grid-rows-2 grid-cols-2 gap-4">
                <div>Shipping Method</div>
                <div>
                    <div>Summary</div>
                    <div>Order</div>
                    <div className="grid grid-cols-3">
                        <div>Product name</div>
                        <div>Quantity</div>
                        <div>Price</div>
                    </div>
                    <div>
                        {cartList}
                    </div>
                    <div className="grid grid-cols-2">
                        <div>Subtotal</div>
                        <div>S${calculateSubtotal().toFixed(2)}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>Shipping</div>
                        <div>Shipping method input</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>Total</div>
                        <div>Total fee input</div>
                    </div>
                </div>
                <div>Shipping Address</div>
                <div>Proceed to Payment</div>
            </div>
        </div>
    );
}

export default Checkout;