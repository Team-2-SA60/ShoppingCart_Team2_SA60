import { useEffect, useState } from "react";
import api from "../../utilities/axios";
import { Alert, Button, Modal, ModalBody, ModalFooter, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";

const AccountAddress = ({customer}) => {

    const [address, setAddress] = useState('');
    const [floorUnit, setFloorUnit] = useState('');
    const [postal, setPostal] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { checkSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (customer.address !== null) {
            const cusAddress = customer.address.split("\n");
            setAddress(cusAddress[0]);
            setFloorUnit(cusAddress[1]);
            setPostal(cusAddress[2]);
        }
    },[customer])

    async function handleChangeAddress(e) {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccess(false);
        
        const fieldOK = fieldCheck();
        if (fieldOK) {
            const changeAddressOK = await changeAddress();
            if (changeAddressOK) {
                setSuccess(true);
            }
        }
        checkSession();
        setLoading(false);
    }

    function fieldCheck() {
        if (!address || !floorUnit || !postal) {
            setMessage("All fields cannot be blank");
            return false;
        }
        if (postal.length !== 6) {
            setMessage("Postal code must be 6-digits");
            return false;
        }
        return true;
    }

    async function changeAddress() {
        try {
            
            const response = await api.put("/account/edit/address",
                {
                    address: address,
                    floorUnitNumber: floorUnit,
                    postalCode: postal
                }
            )
            console.log(response.data);

        } catch (err) {

            const statusCode = err.response?.status;
            const errorMessage = err.response?.data?.message; // Message will be in Array

            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else if (statusCode === 400) {
                setMessage(errorMessage[0] || "Change address failed");
            } else {
                setMessage("Change address failed")
                console.error("Changing address failed: ", err);
            }
            return false;
        }
        return true;
    }

    async function handleDeleteAddress(e) {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccess(false);
        const deleteOk = await deleteAddress();
        if (deleteOk) {
            checkSession();
            setAddress('');
            setFloorUnit('');
            setPostal('');
        }
        setLoading(false);
        setConfirmDelete(false);
    }

    async function deleteAddress() {
        try {

            const response = await api.put("/account/delete/address");
            console.log(response.data);

        } catch (err) {

            const statusCode = err.response?.status;

            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else {
                setMessage("Deleting address failed");
                console.error("Deleting address failed", err);
            }
            return false;
        }
        return true;
    }
    // Prevent keying in of invalid chars for postal code
    const preventInvalidChars = (e) => {
        if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === 'E') {
            e.preventDefault();
        }
    }

    const DeleteAddressBtn = () => {
        if (!customer.address) return;

        return (
            <>
                <Button
                    size="sm"
                    color="primary"
                    onClick={() => setConfirmDelete(true)}
                    className="absolute top-0 right-3 drop-shadow-md active:scale-[0.98]"
                >
                    Delete current address
                </Button>
                <Modal className="text-center" size="sm" isOpen={confirmDelete}>
                    <ModalBody>
                        Delete current address?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => handleDeleteAddress(e)}>Yes</Button>
                        <Button color="secondary" onClick={() => setConfirmDelete(false)}>Back</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

    return (
        <div className="flex flex-col h-full relative">
            <div>
                <h6>Your Address</h6>
                <DeleteAddressBtn />
            </div>
            <form onSubmit={handleChangeAddress}
                className="flex flex-wrap justify-around"
            >
                <div className="mt-4 w-[90%]">
                    <label>Address line *</label>
                    <input
                        type="text"
                        value={address}
                        placeholder="Input your Street Address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="w-[40%] mt-3.5">
                    <label>Floor / Unit Number *</label>
                    <input
                        type="text"
                        value={floorUnit}
                        placeholder="Floor / Unit Number"
                        onChange={(e) => setFloorUnit(e.target.value)}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div className="w-[40%] mt-3.5">
                    <label>Postal *</label>
                    <input
                        type="number"
                        value={postal}
                        placeholder="6-digits postal code"
                        onChange={(e) => setPostal(e.target.value)}
                        onKeyDown={preventInvalidChars}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
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
                    Address saved successfully
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
                        "Save Address"
                    }

                </button>
            </form>
        </div>
    )
}

export default AccountAddress;