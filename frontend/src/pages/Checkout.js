import React, { useEffect, useState } from 'react';
import { useSession} from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import api from "../utilities/axios";
import AppNavbar from "../components/AppNavbar";
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import ShippingAddress from "./ShippingAddress";

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
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        getCustomer();
        getAddress();
        api.get("/checkout")
            .then(res => {
                setCartDetails(res.data);
            })
            .catch(res => {
                console.log("Error fetching cart", res);
            })
    }, [shippingFee]);

    async function getCustomer() {
        const getCustomer = await checkSession();
        setCustomer(getCustomer);
        if (!getCustomer) navigate("/login");
    }

    const calculateSubtotal = () => {
        if (!cartDetails) return 0;
        return cartDetails.reduce((total, item) => {
            return total + (item.quantity) * (item.price);
        }, 0);
    };

    useEffect(() => {
        setTotalCost(calculateSubtotal() + shippingFee);
    }, [calculateSubtotal(), shippingFee]);

    const gridClass = 'grid grid-rows-${cartDetails.length} grid-cols-3 pt-2 pb-2';

    const cartList = cartDetails.map(cartItem => {
        return (
            <div key={cartItem.id} className={gridClass}>
                <div className="italic">{cartItem.productName}</div>
                <div className="text-center">{cartItem.quantity}</div>
                <div className="text-center">S${cartItem.price.toFixed(2)}</div>
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
        console.log(shippingAddress);
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        if (modalOpen) navigate("/");
    }

    async function confirmOrder() {
        const payload = {
            shippingMethod: shippingMethod,
            shippingAddress: shippingAddress
        }
        console.log("Submitting: ", payload);
        try {
            const response = await api.post("/checkout", payload)
                .then(response => {
                    setModalMessage(response.data.message);
                    toggleModal();
                });
            console.log(response);
        } catch (err) {
            const errorMessage = err.response?.data?.message; // Message will be in Array
            console.log(errorMessage[0]);
        }
    }

    // HTML render

    // if (cartDetails.length === 0) {
    //     return (
    //         <div>
    //             <AppNavbar/>
    //             <div className="p-4">Your cart is empty!</div>
    //         </div>
    //     )
    // }

    return (
        <div className="h-[100vh]">
            <AppNavbar/>
            <div className='w-[80vw] h-[90vh] mx-auto p-4'>
                <div className="grid grid-rows-[2fr_3.5fr] grid-cols-2 h-full w-full gap-4">
                    <div className="p-4">
                        <h2>Shipping Method</h2>
                        <div className="bg-white rounded-2 h-[90%] p-4">
                            <div className="text-[16px] pb-4">Select your shipping method: *</div>
                            <div className="grid grid-rows-2 grid-cols-2 text-[18px] h-[75%]">
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
                    <div className="row-span-2 bg-slate-100 p-4">
                        <h2 className="pb-2">Summary</h2>
                        <hr/>
                        <h4>Order Details:</h4>
                        <div className="grid grid-cols-3 pt-4 pb-2 text-[18px]">
                            <div>Product name</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-center">Price</div>
                        </div>
                        <div className="pb-2">
                            {cartList}
                        </div>
                        <hr/>
                        <div className="grid grid-cols-2 pt-2 pb-4">
                            <div className="text-[17px] font-bold">Subtotal:</div>
                            <div className="text-[17px]">S${calculateSubtotal().toFixed(2)}</div>
                        </div>
                        <div className="grid grid-cols-2 pt-2 pb-4">
                            <div className="text-[17px] font-bold">Shipping fee:</div>
                            <div className="text-[17px]">S${shippingFee.toFixed(2)}</div>
                        </div>
                        <div className="grid grid-cols-2 pt-2 pb-4">
                            <div className="text-[17px] font-bold">Total</div>
                            <div className="text-[17px]">S${totalCost.toFixed(2)}</div>
                        </div>
                        <hr/>
                        <div className="flex justify-center pt-2">
                            <Button color="primary" className="checkout-button" onClick={confirmOrder}>
                                Confirm Check Out
                            </Button>
                        </div>
                    </div>
                    <div className="p-4">
                        <h2>Shipping Address</h2>
                        <div className="bg-white rounded-2 h-[90%] p-4">
                            <ShippingAddress customer={customer} onAddressChange={handleAddressChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="text-center" size="sm" isOpen={modalOpen} toggle={toggleModal}>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>OK</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Checkout;