import { useEffect, useRef, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { Alert, Spinner, Toast, ToastBody } from "reactstrap";
import api from "../utilities/axios";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const CreateAccount = () => {

    const nameField = useRef();
    const emailField = useRef();
    const passwordField = useRef();
    const verifyPasswordField = useRef();
    const [ message, setMessage ] = useState("");
    const { customer, checkSession } = useSession();
    const [ success, setSuccess ] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        checkSession();
        if (customer !== null) {
            navigate("/");
        }
        // eslint-disable-next-line
    },[customer])

    async function handleCreateAccount(e) {
        e.preventDefault();
        setMessage('');
        const [name, email, password, verifyPassword] = [nameField.current.value, 
                                                        emailField.current.value, 
                                                        passwordField.current.value, 
                                                        verifyPasswordField.current.value];
        
        const fieldOK = fieldCheck(name, email, password, verifyPassword);
        const passwordOk = passwordCheck(password, verifyPassword);
        if (fieldOK && passwordOk) {
            const createOK = await createAccount(name, email, password);
            if (createOK) setSuccess(true);
        }
    }

    function fieldCheck(name, email, password, verifyPassword) {
        if (!name || !email || !password || !verifyPassword) {
            return false;
        }
        return true;
    }

    function passwordCheck(password, verifyPassword) {
        if (password.includes(" ")) {
            setMessage("Password cannot contain space")
            return false;
        }
        if (password !== verifyPassword) {
            setMessage("Password inputs do not match");
            return false;
        }
        return true
    }

    async function createAccount(name, email, password) {
        let createResponse;
        try {
            createResponse = await api.post("/account/create",  {
                                                                    name: name,
                                                                    email: email, 
                                                                    password: password
                                                                });
            console.log(createResponse.data);
        } catch (err) {
            const statusCode = err.response?.status;
            const responseMessage = err.response?.data;

            if (statusCode === 401) {
                setMessage("Email already registered");
            } else if (statusCode === 403) {
                navigate("/");
                return false;
            } else {
                setMessage(responseMessage || "Creating account failed");
            }
            console.error('Creating account failed:', responseMessage);
            return false;
        }
        return true;
    }
    
    if (success) {
        setTimeout(function () {
            navigate("/login");
        }, 5000);
        
        return (
            <div>
                <AppNavbar />
                <div className="flex items-center justify-center min-h-[80vh] w-full box-border">
                    <div className="p-3 my-2 rounded">
                        <Toast>
                            <ToastBody className="text-center">
                                <h4>Account created!</h4>
                                <Spinner>
                                    Loading...
                                </Spinner>
                                <br/>
                                <a href="/login">Redirecting you back to login...</a>
                            </ToastBody>
                        </Toast>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppNavbar />
            <div className="flex items-center justify-center min-h-[80vh] w-full">
                <div className="bg-slate-100 w-[600px] p-4 rounded-xl border drop-shadow-md ">
                    <div className="grid grid-cols-1">
                        <h3 className="text-center">Create An Account</h3>
                        <form onSubmit={handleCreateAccount}>
                            <div className="mb-3.5">
                                <label>Name *</label>
                                <input 
                                    type="text" 
                                    className="w-[100%] p-2 mt-[5px] border-[1px] border-slate-300 rounded-md" 
                                    ref={nameField} 
                                    required
                                />
                            </div>
                            <div className="mb-3.5">
                                <label>Email Address *</label>
                                <input 
                                    type="email" 
                                    className="w-[100%] p-2 mt-[5px] border-[1px] border-slate-300 rounded-md" 
                                    ref={emailField} 
                                    required
                                />
                            </div>
                            <div className="mb-3.5">
                                <label>Password *</label>
                                <input 
                                    type="password" 
                                    className="w-[100%] p-2 mt-[5px] border-[1px] border-slate-300 rounded-md" 
                                    ref={passwordField} 
                                    required
                                />
                            </div>
                            <div className="mb-3.5">
                                <label>Verify Password *</label>
                                <input 
                                    type="password" 
                                    className="w-[100%] p-2 mt-[5px] border-[1px] border-slate-300 rounded-md" 
                                    ref={verifyPasswordField} 
                                    required
                                />
                            </div>
                            <Alert 
                                color="danger" 
                                isOpen={message !== ""} 
                                className="p-1"
                            >
                                {message}
                            </Alert>
                            <button 
                                type="submit" 
                                className="bg-black text-white font-bold 
                                    w-full px-3.5 py-2.5 mt-2.5 rounded-md cursor-pointer 
                                    hover:!bg-slate-800 active:scale-[0.97] transition-all">
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;