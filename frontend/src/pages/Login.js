import React, {useEffect, useState} from 'react';
import AppNavbar from "../components/AppNavbar";
import './Login.css'
import { useNavigate } from 'react-router-dom';
import api from '../utilities/axios';
import { useSession } from '../context/SessionContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { customer, checkSession} = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        checkSession();
        if (customer !== null) {
            navigate("/");
        }
        // eslint-disable-next-line
    },[customer])

    const handleLogin = async (event) => {

        event.preventDefault();
        api.post("/login", {
            email, password
        })
        .then(res => {
            console.log("Login success:", res.data);
            navigate("/")
        })
        .catch(err => {
            const statusCode = err.response?.status;
            const responseMessage = err.response?.data.message;

            if (statusCode === 404) {
                setMessage("User not found");
            } else if (statusCode === 401) {
                setMessage("Password is incorrect");
            } else {
                setMessage(responseMessage || "Login failed");
            }
            console.error('Login failed:', responseMessage);
        });
    };

    return (
        <div>
            <AppNavbar />
            <div className="login-container">
                <div className="login-box">
                    <div className="login-section">
                        <h2>Log In to your account</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {message && (
                                <div className="alert alert-info">
                                    {message}
                                </div>
                            )}
                            <button type="submit" className="login-button hover:bg-slate-800">LOGIN</button>
                        </form>
                    </div>
                    <div className="login-section signup-info">
                        <h2>Don't have an account?</h2>
                        <p>Create one now to:</p>
                        <ul>
                            <li>❤️ Add items to wishlist</li>
                            <li>📍 Easily track orders</li>
                            <li>🛒 View order history</li>
                        </ul>
                        <a href="/account/create" className="no-underline"><button className="signup-button hover:bg-slate-800">CREATE AN ACCOUNT</button></a>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default Login;