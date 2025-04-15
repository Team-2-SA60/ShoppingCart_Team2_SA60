import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Modal, ModalBody, ModalFooter, Spinner } from "reactstrap";
import api from "../../utilities/axios";

const AccountCreditCard = () => {
    const [existingCc, setExistingCc] = useState('');
    const [ccName, setCCName] = useState('');
    const [ccNumber, setCCNumber] = useState('');
    const [ccExpiry, setCCExpiry] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    useState(() => {
        getCreditCardInfo();
    }, [])

    async function getCreditCardInfo() {
        try {
            const response = await api.get("/account/creditcard");
            if (response.data.creditCardName !== null) {
                maskCcNumber(response.data);
            } else {
                setExistingCc('');
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

    // Converts current credit card info to mask number to last 4 digits
    function maskCcNumber(data) {
        const convertedData = {
            creditCardName: data.creditCardName,
            creditCardNumber: '************-' + data.creditCardNumber.substr(-4),
            creditCardExpiry: data.creditCardExpiry
        }
        setExistingCc(convertedData);
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


    async function handleChangeCreditCard(e) {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccess(false);

        const fieldOK = fieldCheck();
        if (fieldOK) {
            const saveCreditCardOK = await saveCreditCard();
            if (saveCreditCardOK) {
                getCreditCardInfo(); // Refresh current card, pls work ):
                setSuccess(true);
            }
        }
        setLoading(false);
    }

    function fieldCheck() {
        if (!ccName || !ccNumber || !ccExpiry) {
            setMessage("All fields cannot be blank");
            return false;
        }
        if (!ccExpiry.match(/^\d{2}\/\d{2}$/g)) {
            setMessage("Unexpected Expiration date");
            return false;
        }
        return true;
    }

    async function saveCreditCard() {
        try {

            const response = await api.put("/account/edit/creditcard",
                {
                    creditCardName: ccName,
                    creditCardNumber: ccNumber.replace(/\D/g, '').substring(0, 16),
                    creditCardExpiry: ccExpiry
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
                setMessage(errorMessage[0] || "Saving Credit Card failed");
            } else {
                setMessage("Saving Credit Card failed");
                console.error("Saving Credit Card failed", err);
            }
            return false;
        }
        return true;
    }
    
    async function handleDeleteCard(e) {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccess(false);
        const deleteOk = await deleteCard();
        if (deleteOk) {
            getCreditCardInfo(); // Refresh current card, pls work ):
        }
        setLoading(false);
        setConfirmDelete(false);
    }

    async function deleteCard() {
        try {

            const response = await api.put("/account/delete/creditcard");
            console.log(response.data);

        } catch (err) {

            const statusCode = err.response?.status;

            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else {
                setMessage("Deleting Credit Card failed");
                console.error("Deleting Credit Card failed", err);
            }
            return false;
        }
        return true;
    }

    const ShowExistingCc = () => {
        return (
            <div className="bg-white text-[10px] grid grid-cols-1 h-12 rounded-md drop-shadow-md border px-1 min-w-32 max-w-40 mr-4">
                <span className="absolute right-1 -top-4">Current Card</span>
                <button onClick={() => setConfirmDelete(true)} className="absolute left-1 bottom-0 text-blue-700 underline">Delete</button>
                <div>
                    <span className="line-clamp-1 text-right">{existingCc.creditCardName}</span>
                </div>
                <div>
                    <span className="line-clamp-1 text-right">{existingCc.creditCardNumber}</span>
                </div>
                <div>
                    <span className="text-red-500 font-bold">{existingCc.isExpired ? "Expired" : ""}</span>
                    <span className="line-clamp-1 text-right">{existingCc.creditCardExpiry}</span>
                </div>
                <Modal className="text-center" size="sm" isOpen={confirmDelete}>
                    <ModalBody>
                        Delete current Credit Card?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => handleDeleteCard(e)}>Yes</Button>
                        <Button color="secondary" onClick={() => setConfirmDelete(false)}>Back</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    
    return (
        <div className="flex flex-col h-full relative">
            <div className="flex justify-between">
                <h6>Save Credit Card</h6>
                <div className="flex">
                    {existingCc === '' || existingCc.creditCardName === null ? "" : <ShowExistingCc />}
                    <img src="../images/mastercard.png" alt="mastercard" />
                    <img src="../images/visa.png" alt="visa" />
                </div>
            </div>
            <form
                onSubmit={handleChangeCreditCard}
                className="flex flex-wrap justify-around"
            >
                <div className="w-full">
                    <label>Card Number *</label>
                    <input
                        type="text"
                        onChange={(e) => handleCreditCardNumberField(e)}
                        value={ccNumber}
                        placeholder="Card Number"
                        maxLength={19}
                        className="p-1 mt-[5px] my-[2%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="w-full">
                    <label>Name on card *</label>
                    <input
                        type="text"
                        onChange={(e) => setCCName(e.target.value)}
                        placeholder="Name"
                        className="p-1 mt-[5px] my-[2%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="w-full">
                    <label className="w-full">Expiration (MM/YY) *</label>
                    <input
                        type="text"
                        onChange={(e) => handleExpiryField(e)}
                        value={ccExpiry}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-[35%] p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md"
                        required
                    />
                </div>
                <Alert
                    color="danger"
                    isOpen={message !== ''}
                    className="p-2 mt-2 w-[90%]"
                >
                    {message}
                </Alert>
                <Alert
                    color="success"
                    isOpen={success}
                    className="p-2 mt-2 w-[90%]"
                >
                    Credit Card saved successfully
                </Alert>
                <button
                    type="submit"
                    className={`bg-black text-white font-bold
                                w-full px-3.5 py-2.5 rounded-md 
                                absolute -bottom-3
                                hover:!bg-slate-800 active:scale-[0.97] transition-all`}
                >
                    {isLoading ?
                        <Spinner size={'sm'}>Loading...</Spinner>
                        :
                        "Save Credit Card"
                    }

                </button>
            </form>
        </div>
    )
}

export default AccountCreditCard;