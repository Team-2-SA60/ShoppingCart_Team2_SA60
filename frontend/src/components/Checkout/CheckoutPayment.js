import { useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import api from "../../utilities/axios";
import { useNavigate } from "react-router-dom";

const CheckoutPayment = ({ modalOpen, closePayment, confirmOrder }) => {

        const [ccName, setCCName] = useState('');
        const [ccNumber, setCCNumber] = useState('');
        const [ccExpiry, setCCExpiry] = useState('');
        const [ccCVV, setCVV] = useState('');
        const [isLoading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
        const navigate = useNavigate();

    useState(() => {
        getCreditCardInfo();
    }, [])

    async function getCreditCardInfo() {
        try {
            const response = await api.get("/account/creditcard");
            if (response.data.creditCardName !== null) {
                setCCName(response.data.creditCardName);
                setCCNumber(formatCCNumber(response.data.creditCardNumber));
                setCCExpiry(response.data.creditCardExpiry);
            }
        } catch (err) {
            const statusCode = err.response?.status;
            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else {
                console.error("Failed to get credit card info", err)
            }
        }
    }

    function formatCCNumber(number) {
        return number.replaceAll(/(\d{4})(\d{4})(\d{4})(\d{4})/g, '$1-$2-$3-$4');
    }

    // Automatically input a "-" after every 4 numbers
    function handleCreditCardNumberField(e) {
        e.preventDefault();
        let input = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = input.replace(/(\d{4})(?=\d)/g, '$1-');
        setCCNumber(formatted);
    }

    // Automatically input a "/" after every 2 numbers
    function handleExpiryField(e) {
        e.preventDefault();
        let input = e.target.value.replace(/[^0-9/]/g, '').substring(0, 5);
        let formatted = input.replace(/(\d{2})(?=\d)/g, '$1/');
        setCCExpiry(formatted);
    }

    async function handlePayment(e) {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        if (fieldCheck()) {
            const creditCardOk = await checkCreditCard();
            if (creditCardOk) {
                closePayment();
                confirmOrder();
            }
        }
        setLoading(false);
    }

    function fieldCheck() {
        if (!ccName || !ccNumber || !ccExpiry || !ccCVV) {
            setMessage("All fields cannot be blank");
            return false;
        }
        if (!ccExpiry.match(/^\d{2}\/\d{2}$/g)) {
            setMessage("Unexpected Expiration date");
            return false;
        }
        if (!ccCVV.match(/^\d{3}$/g)) {
            setMessage("CVV must be 3 digits");
            return false;
        }
        return true;
    }

    async function checkCreditCard() {
        try {

            const response = await api.post("/checkout/check-credit-card",
                {
                    creditCardName: ccName,
                    creditCardNumber: ccNumber.replace(/\D/g, '').substring(0, 16),
                    creditCardExpiry: ccExpiry,
                    creditCardCVV: ccCVV
                }
            );
            console.log(response.data);

        } catch (err) {

            const statusCode = err.response?.status;
            const errorMessage = err.response?.data?.message; // Message will be in Array

            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else if (statusCode === 400) {
                setMessage(errorMessage[0] || "Payment failed");
            } else {
                setMessage("Payment failed");
                console.error("Payment failed", err);
            }
            return false;
        }
        return true;
    }

    return (
        <Modal size="md" isOpen={modalOpen} centered backdrop="static">
            <ModalHeader className="justify-center">
                Credit Card Payment
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handlePayment}>
                    <div className="w-[400px] mx-auto">
                        <div className="text-left">
                            <label>Card Number *</label>
                            <input
                                type="text"
                                value={ccNumber}
                                onChange={(e) => handleCreditCardNumberField(e)}
                                placeholder="Card Number"
                                maxLength={19}
                                className="p-1 mt-[5px] my-[2%] border-[1px] border-slate-300 rounded-md w-full"
                                required
                            />
                            <label>Name on card *</label>
                            <input
                                type="text"
                                value={ccName}
                                onChange={(e) => setCCName(e.target.value)}
                                placeholder="Name"
                                className="p-1 mt-[5px] my-[2%] border-[1px] border-slate-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-row text-left">
                            <div>
                                <label className="w-full">Expiration *</label>
                                <input
                                    type="text"
                                    value={ccExpiry}
                                    onChange={(e) => handleExpiryField(e)}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className="w-[50%] p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="w-full">CVV *</label>
                                <input
                                    type="number"
                                    value={ccCVV}
                                    onChange={(e) => setCVV(e.target.value)}
                                    placeholder="CVV"
                                    className="w-[50%] p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mt-2 place-content-end">
                            <div>
                                <Alert
                                    color="danger"
                                    isOpen={message !== ''}
                                    className="p-2 text-sm"
                                >
                                    {message}
                                </Alert>
                            </div>
                            <div className="flex gap-2 place-content-end">
                                <Button 
                                    color="secondary" 
                                    className="w-[80px]" 
                                    onClick={() => {
                                        setMessage('');
                                        closePayment();
                                    }}
                                >
                                    <span>Back</span>
                                </Button>
                                <Button 
                                    color="primary" 
                                    className="w-[80px]" 
                                    type="submit"
                                >
                                    {isLoading ?
                                        <Spinner size={'sm'}>Loading...</Spinner>
                                        :
                                        "Confirm"
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default CheckoutPayment;