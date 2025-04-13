import { useState } from "react";
import api from "../../utilities/axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

const AccountName = ({customer}) => {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    async function handleChangeName(e) {
        e.preventDefault();
        setMessage('');

        const fieldOK = checkField();
        if (fieldOK) {
            const updateOK = await updateName();
            if (updateOK) navigate(0);
        }
    }

    function checkField() {
        if (name === "") {
            setMessage("Name cannot be blank");
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

        } catch(err) {
            
            const statusCode = err.response?.status;
            const errorMessage = err.response?.data?.message; // Message will be in Array

            if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else {
                setMessage(errorMessage[0] || "Saving name failed");
                console.error('Saving name failed:', errorMessage);
            }
            return false;
        }
        return true;
    }

    return (
        <div className="flex flex-col h-full">
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
                        className="p-2 mt-[5px] my-[5%] border-[1px] border-slate-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <div className="p-2 mt-[5px] my-[5%] border-[1px] border-slate-300 rounded-md select-none">
                        {customer.email}
                    </div>
                </div>
                {customer.address ? 
                    <div>
                        <label>Address</label>
                        <div className="p-2 mt-[5px] border-[1px] border-slate-300 rounded-md select-none">
                            {customer.address}
                        </div>
                    </div>
                    :
                    ""
                }
                <Alert
                    color="danger"
                    isOpen={message !== ""}
                    className="p-1"
                >
                    {message}
                </Alert>
                <button
                    type="submit"
                    className={`bg-black text-white font-bold opacity-0
                                w-full px-3.5 py-2.5 mt-2.5 rounded-md 
                                hover:!bg-slate-800 active:scale-[0.97] transition-all
                                ${name.length !== 0 && name !== customer.name ? "opacity-100" : "disabled"}`}
                >
                    Change name
                </button>
            </form>
        </div>
    )
}

export default AccountName;