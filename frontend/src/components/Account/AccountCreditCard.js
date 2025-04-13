import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "reactstrap";
import api from "../../utilities/axios";

const AccountCreditCard = () => {
    const [ccName, setCCName] = useState('');
    const [ccNumber, setCCNumber] = useState('');
    const [ccExpiry, setCCExpiry] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    async function handleChangeCreditCard(e) {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccess(false);
        const fieldOK = fieldCheck();
        if (fieldOK) {
            const saveCreditCardOK = await saveCreditCard();
            setSuccess(true);
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
                    creditCardNumber: ccNumber,
                    creditCardExpiry: ccExpiry
                }
            )
            console.log(response.data);

        } catch (err) {
            
            const statusCode = err.response?.status;
            const errorMessage = err.response?.data?.message; // Message will be in Array

            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else {
                setMessage(errorMessage[0] || "Change address failed")
                console.error(errorMessage);
            }
            return false;
        }
        return true;
    }
   
    return (
        <div className="flex flex-col h-full relative">
            <div className="flex justify-between">
                <h6>Save Credit Card</h6>
                <div className="flex">
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
                        onChange={(e) => setCCNumber(e.target.value)}
                        placeholder="Card Number"
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
                        onChange={(e) => setCCExpiry(e.target.value)}
                        placeholder="MM/YY"
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