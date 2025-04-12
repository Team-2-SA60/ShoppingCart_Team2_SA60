import { useState } from "react";
import api from "../../utilities/axios";
import { Alert, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const AccountPassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    async function handleChangePassword(e){
        e.preventDefault();
        setLoading(true);
        const passwordOK = passwordCheck();
        if (passwordOK) {
            const changePasswordOK = await changePassword();
            if (changePasswordOK) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setSuccess(true);
            }
        }
        setLoading(false);
    }

    function passwordCheck() {
        if (currentPassword.includes(" ") || newPassword.includes(" ") || confirmNewPassword.includes(" ")) {
            setMessage("Password cannot have space");
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            setMessage("Passwords entered do not match");
            return false;
        }
        if (currentPassword === newPassword) {
            setMessage("New password same as current password")
        }
        setMessage('');
        return true;
    }

    async function changePassword() {
        try {
            let response = await api.put("/account/edit/password", null, 
                {params: 
                    {   currentpassword: currentPassword,
                        newpassword: newPassword
                    }});
            console.log(response.data);
        } catch (err) {
            const statusCode = err.response?.status;
            const responseMessage = err.response?.data?.message;

            if (statusCode === 403) {
                console.log("Customer not logged in");
                navigate("/login");
            } else if (statusCode === 400) {
                setMessage("Password requirements not met");
            } else if (statusCode === 401) {
                setMessage("Wrong password input")
            }
            console.error('Creating account failed:', responseMessage);
            return false;
        }
        return true;
    }

    return (
        <div className="flex flex-col h-full relative">
            <div>
                <h6>Change Password</h6>
            </div>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
                    />
                </div>
                <Alert
                    color="danger"
                    isOpen={message !== ''}
                    className="pl-1 py-0"
                >
                    {message}
                </Alert>
                <Alert
                    color="success"
                    isOpen={success}
                    className="pl-1 py-0"
                >
                    Password successfully changed
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
                        "Change Password"
                    }
                    
                </button>
            </form>
        </div>
    )
}

export default AccountPassword;