import React, {useState} from 'react';
import axios from 'axios';
import AppNavbar from "../components/AppNavbar";
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/login", {email, password});
            setMessage(response.data);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
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
                            <button type="submit" className="login-button">LOGIN</button>
                        </form>
                    </div>
                    <div className="login-section signup-info">
                        <h2>Don't have an account?</h2>
                        <p>Create one now to:</p>
                        <ul>
                            <li>❤️ add items to wishlist</li>
                            <li>📍 easily track orders</li>
                            <li>🛒 view order history</li>
                        </ul>
                        <button className="signup-button">CREATE AN ACCOUNT</button>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default Login;