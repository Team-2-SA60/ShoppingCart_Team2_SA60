import { useState } from "react";
import api from "../../utilities/axios";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "reactstrap";
import { useSession } from "../../context/SessionContext";

const AccountName = ({customer}) => {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { setCustomer } = useSession();

    const navigate = useNavigate();

    async function handleChangeName(e) {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setSuccess(false);

        const fieldOK = checkField();
        if (fieldOK) {
            const updateOK = await updateName();
            if (updateOK) {
                setSuccess(true);
            }
        }
        setLoading(false);
    }

    function checkField() {
        if (name === "") {
            setMessage("Name cannot be blank");
            return false;
        }
        if (name === customer.name) {
            return false;
        }
        return true;
    }

    async function updateName() {
        try {

            const response = await api.put("/account/edit/name", {name: name})
            console.log("Updated name: " + response.data.name);
            setCustomer(response.data);
            
        } catch(err) {
            
            const statusCode = err.response?.status;
            const errorMessage = err.response?.data?.message; // Message will be in Array

            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else if (statusCode === 400) {
                setMessage(errorMessage[0] || "Saving name failed");
            } else {
                setMessage("Saving name failed");
                console.error('Saving name failed:', err);
            }
            return false;
        }
        return true;
    }

    return (
        <div className="flex flex-col h-full relative">
            <div>
                <h6>Account Details</h6>
                <br/>
            </div>
            <form onSubmit={handleChangeName}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text"
                        placeholder={customer.name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-1 mt-[3px] my-[2%] border-[1px] border-slate-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <div className="p-1 mt-[3px] my-[2%] border-[1px] border-slate-300 rounded-md select-none">
                        {customer.email}
                    </div>
                </div>
                {customer.address ? 
                    <div>
                        <label>Address</label>
                        <div className="p-1 mt-[3px] border-[1px] border-slate-300 rounded-md select-none">
                            {customer.address}
                        </div>
                    </div>
                    :
                    ""
                }
                <Alert
                    color="danger"
                    isOpen={message !== ""}
                    className="p-2 mt-2"
                >
                    {message}
                </Alert>
                <Alert
                    color="success"
                    isOpen={success}
                    className="p-2 mt-2"
                >
                    Name saved successfully
                </Alert>
                <button
                    type="submit"
                    className={`bg-black text-white font-bold
                                w-full px-3.5 py-2.5 rounded-md 
                                absolute -bottom-3
                                hover:!bg-slate-800 active:scale-[0.97] transition-all
                                ${name !== customer.name && name !== "" ? "" : "hidden"}`}
                >
                    {isLoading ?
                        <Spinner size={'sm'}>Loading...</Spinner>
                        :
                        "Change name"
                    }
                </button>
            </form>
        </div>
    )
}

export default AccountName;