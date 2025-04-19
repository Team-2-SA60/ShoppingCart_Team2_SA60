import React, { useEffect, useState } from 'react';
import { useSession} from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import api from "../utilities/axios";
import AppNavbar from "../components/AppNavbar";
import {Alert, Button, Spinner, Toast, ToastBody} from "reactstrap";
import ShippingAddress from "../components/Checkout/ShippingAddress";
import CheckoutPayment from '../components/Checkout/CheckoutPayment';

const Checkout = () => {

    const { customer, setCustomer, checkSession} = useSession();
    const navigate = useNavigate();
    const [cartDetails, setCartDetails] = useState([]);
    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        floorUnitNumber: "",
        postalCode: ""
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getCustomer();
        if (customer) {
            getAddress();
        }
        api.get("/checkout")
            .then(res => {
                setCartDetails(res.data);
            })
            .catch(res => {
                console.log("Error fetching cart", res);
            })
        // eslint-disable-next-line
    }, []);

    async function getCustomer() {
        const getCustomer = await checkSession();
        setCustomer(getCustomer);
        if (!getCustomer) {
            navigate("/login");
            return;
        }
        if (getCustomer.cartSize === 0) navigate("/");
    }

    const calculateSubtotal = () => {
        if (!cartDetails) return 0;
        return cartDetails.reduce((total, item) => {
            return total + (item.price - item.discount) * item.quantity;
        }, 0);
    };

    useEffect(() => {
        setTotalCost(calculateSubtotal() + shippingFee);
        // eslint-disable-next-line
    }, [calculateSubtotal(), shippingFee]);

    const cartList = cartDetails.map(cartItem => {
        return (
            <div key={cartItem.id} className="grid grid-cols-3 pt-2 pb-2 items-center">
                <div className="italic">{cartItem.productName}</div>
                <div className="text-center">{cartItem.quantity}</div>
                <div className="text-right">S${((cartItem.price - cartItem.discount) * cartItem.quantity).toFixed(2)}</div>
            </div>
        )
    });

    function handleShipping(e) {
        setShippingMethod(e.target.value);
        setShippingFee(e.target.value === "express" ? 10.00 : 0.00);
    }

    // customer existing address if any
    async function getAddress() {
        if (!customer.address) {
            return;
        }
        const customerAddress = customer.address.split("\n");
        setShippingAddress( {
            address: customerAddress[0],
            floorUnitNumber: customerAddress[1],
            postalCode: customerAddress[2]
        });
    }

    // updates shipping info based on changes in Shipping Address component
    const handleAddressChange = (newData) => {
        setShippingAddress((prev) => ({...prev, ...newData}));
    }

    const closePayment = () => {
        setModalOpen(false);
    }

    const openPayment = () => {
        setMessage('');
        if (!fieldCheck()) {
            return;
        }
        setModalOpen(true);
    }

    function fieldCheck() {
        if (!shippingMethod) {
            setMessage("Please specify shipping method");
            return false;
        }
        if (!shippingAddress.address ||
            !shippingAddress.floorUnitNumber ||
            !shippingAddress.postalCode) {
            setMessage("Address fields cannot be blank");
            return false;
        }
        if (shippingAddress.postalCode.length !== 6) {
            setMessage("Postal code must be 6-digits");
            return false;
        }
        return true;
    }

    async function confirmOrder() {
        const payload = {
            shippingMethod: shippingMethod,
            shippingAddress: shippingAddress
        }
        console.log("Submitting: ", payload);
        try {
            await api.post("/checkout", payload);
            setSuccess(true);
        } catch (err) {
            const errorMessage = err.response?.data?.message; // Message will be in Array
            setMessage("Checkout encountered error, please try again")
            console.log(errorMessage[0]);
        }
    }

    if (success) {
        setTimeout(function () {
            navigate("/orders");
        }, 3000);

        return (
            <div>
                <AppNavbar />
                <div className="flex items-center justify-center min-h-[80vh] w-full box-border">
                    <div className="p-3 my-2 rounded">
                        <Toast>
                            <ToastBody className="text-center">
                                <h4>Payment completed!</h4>
                                <Spinner>
                                    Loading...
                                </Spinner>
                                <br />
                                <a href="/orders">Redirecting to your orders</a>
                            </ToastBody>
                        </Toast>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-[100vh]">
            <AppNavbar/>
            <div className='p-4 place-items-center'>
                <div className="flex flex-col items-center lg:flex-row lg:items-start">
                    <div className='flex flex-col'>
                        <div className="p-4 w-[600px]">
                            <h2>Shipping Method</h2>
                            <div className="bg-slate-50 rounded-2 h-[90%] p-4 border drop-shadow-md">
                                <div className="text-[16px] pb-4 font-bold">Select your shipping method: *</div>
                                <div className="grid grid-rows-2 grid-cols-2 text-[18px] h-[75%] gap-4">
                                    <div>
                                        <input type="radio"
                                            name="shipping"
                                            value="standard"
                                            onClick={handleShipping}
                                            required/> Standard delivery
                                    </div>
                                    <div className="text-center italic">Free!</div>
                                    <div>
                                        <input type="radio"
                                            name="shipping"
                                            value="express"
                                            onClick={handleShipping}
                                            required/> Express delivery
                                    </div>
                                    <div className="text-center">S$10</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 w-[600px]">
                            <h2>Shipping Address</h2>
                            <div className="bg-slate-50 rounded-2 h-[90%] p-4 border drop-shadow-md">
                                <ShippingAddress customer={customer} onAddressChange={handleAddressChange} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-[500px] bg-slate-50 p-4 mt-1 rounded-3 border-2 drop-shadow-md">
                        <h2>Summary</h2>
                        <hr/>
                        <h4>Order Details:</h4>
                        <div className="grid grid-cols-3 pt-2 pb-2 text-[18px]">
                            <div>Product name</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-right">Price</div>
                        </div>
                        <div>
                            {cartList}
                        </div>
                        <hr/>
                        <div className="grid grid-cols-2 pt-2 pb-2">
                            <div className="text-[17px] font-bold">Subtotal:</div>
                            <div className="text-[17px] text-right">S${calculateSubtotal().toFixed(2)}</div>
                        </div>
                        <div className="grid grid-cols-2 pt-2 pb-2">
                            <div className="text-[17px] font-bold">Shipping fee:</div>
                            <div className="text-[17px] text-right">S${shippingFee.toFixed(2)}</div>
                        </div>
                        <div className="grid grid-cols-2 pt-2 pb-2">
                            <div className="text-[17px] font-bold">Total</div>
                            <div className="text-[17px] text-right">S${totalCost.toFixed(2)}</div>
                        </div>
                        <hr/>
                        <div className="flex justify-center">
                            <Alert
                                color="danger"
                                isOpen={message !== ''}
                                className="p-2 mt-2 w-[85%] text-[14px] text-center">
                                {message}
                            </Alert>
                        </div>
                        <div className="flex justify-center pt-2">
                            <Button color="primary" className="w-full" onClick={openPayment}>
                                Proceed to Payment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutPayment modalOpen={modalOpen} closePayment={closePayment} confirmOrder={confirmOrder}/>
        </div>
    );
}

export default Checkout;