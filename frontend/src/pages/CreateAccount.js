import { useEffect, useRef, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { Alert } from "reactstrap";
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
    const navigate = useNavigate();
    
    useEffect(() => {
        checkSession();
        if (customer !== null) {
            navigate("/");
        }
    },[customer])

    function handleCreateAccount(e) {
        e.preventDefault();
        setMessage('');
        const [name, email, password, verifyPassword] = [nameField.current.value, 
                                                        emailField.current.value, 
                                                        passwordField.current.value, 
                                                        verifyPasswordField.current.value];
        
        const fieldOK = fieldCheck(name, email, password, verifyPassword);
        const passwordOk = passwordCheck(password, verifyPassword);
        if (fieldOK && passwordOk) {
            const createOK = createAccount(name, email, password);
            if (createOK) navigate("/login");
        }
    }

    function fieldCheck(name, email, password, verifyPassword) {
        if (!name || !email || !password || !verifyPassword) {
            return false
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

        } catch (err) {
            const statusCode = err.response?.status;
            const responseMessage = err.response?.data.message;

            if (statusCode === 417) {
                setMessage("Email already registered");
            } else {
                setMessage(responseMessage || "Creating account failed");
            }
            console.error('Creating account failed:', responseMessage);
        }
        return true;
    }
    
    return (
        <div>
            <AppNavbar />
            <div className="flex items-center justify-center h-[80vh] w-full">
                <div className="bg-slate-100 w-[600px] p-4 rounded-xl border drop-shadow-md ">
                    <div className="grid grid-cols-1">
                        <h3 className="text-center">Create An Account</h3>
                        <form onSubmit={handleCreateAccount}>
                            <div className="form-group">
                                <label>Name *</label>
                                <input type="text" className="form-input" ref={nameField} required/>
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input type="email" className="form-input" ref={emailField} required/>
                            </div>
                            <div className="form-group">
                                <label>Password *</label>
                                <input type="password" className="form-input" ref={passwordField} required/>
                            </div>
                            <div className="form-group">
                                <label>Verify Password *</label>
                                <input type="password" className="form-input" ref={verifyPasswordField} required/>
                            </div>
                            <Alert color="danger" isOpen={message !== ""} className="p-1">
                                {message}
                            </Alert>
                            <button type="submit" className="login-button hover:bg-slate-800">Create Account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;