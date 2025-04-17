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
        setMessage('');
        setLoading(true);
        setSuccess(false);
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
        if (newPassword !== confirmNewPassword) {
            setMessage("Passwords entered do not match");
            return false;
        }
        if (currentPassword === newPassword) {
            setMessage("New password same as current password");
            return false;
        }
        if (currentPassword.includes(" ") || newPassword.includes(" ") || confirmNewPassword.includes(" ")) {
            setMessage("Password cannot have space");
            return false;
        }
        return true;
    }

    async function changePassword() {
        try {

            const response = await api.put("/account/edit/password",
                {
                    password: currentPassword,
                    newPassword: newPassword
                }
            );
            console.log(response.data);

        } catch (err) {

            const statusCode = err.response?.status;
            const errorMessage = err.response?.data?.message; // Message will be in Array

            if (statusCode === 401) {
                // 401 error (backend checks if current password input is correct, cannot change password if input wrong)
                setMessage("Wrong password input")
            } else if (statusCode === 403) {
                // 403 error if user session is NOT logged in
                navigate("/login");
            } else {
                setMessage(errorMessage[0] || "Change password failed")
                console.error(errorMessage);
            }
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
                <div className="mt-3">
                    <label>Current Password *</label>
                    <input
                        type="password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label>New Password *</label>
                    <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        className="p-1 mt-[5px] my-[3%] border-[1px] border-slate-300 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password *</label>
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
                    Password changed successfully
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