import React, {useEffect, useState} from 'react';
import AppNavbar from "../components/AppNavbar";
import { useNavigate } from 'react-router-dom';
import api from '../utilities/axios';
import { useSession } from '../context/SessionContext';
import { Alert } from 'reactstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { checkSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        getCustomer();
        // eslint-disable-next-line
    },[])

    async function getCustomer() {
        const customer = await checkSession();
        if (customer) navigate("/");
    }

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
            const errorMessage = err.response?.data?.message;

            if (statusCode === 404) {
                setMessage("User not found");
            } else if (statusCode === 401) {
                setMessage("Password is incorrect");
            } else {
                setMessage("Login failed");
                console.error(errorMessage);
            }
        });
    };

    return (
        <div>
            <AppNavbar />
            <div className="flex items-center justify-center min-h-[80vh] w-full box-border">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-100 p-4 rounded-xl drop-shadow-md">
                    <div className="m-2.5">
                        <h2>Log In to your account</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3.5">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    className="w-[100%] p-2 mt-[5px] border-[1px] border-slate-300 rounded-md"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3.5">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    className="w-[100%] p-2 mt-[5px] border-[1px] border-slate-300 rounded-md"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
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
                            <button type="submit" 
                                className="bg-black text-white font-bold 
                                    w-full px-3.5 py-2.5 mt-2.5 rounded-md cursor-pointer 
                                    hover:!bg-slate-800 active:scale-[0.97] transition-all"
                            >
                                LOGIN
                            </button>
                        </form>
                    </div>
                    <div className="m-2.5 border-t-[1px] pt-2 md:border-l-[1px] md:pl-5 md:border-t-0 md:mt-[1px]">
                        <h2>Don't have an account?</h2>
                        <p>Create one now to:</p>
                        <ul className="mb-10">
                            <li className="m-2.5">❤️ Add items to wishlist</li>
                            <li className="m-2.5">📍 Easily track orders</li>
                            <li className="m-2.5">🛒 View order history</li>
                        </ul>
                        <a href="/create_account" className="no-underline">
                            <button className="bg-black text-white font-bold 
                                        w-full px-3.5 py-2.5 rounded-md cursor-pointer 
                                        hover:!bg-slate-800 active:scale-[0.97] md:mt-2.5 transition-all"
                            >
                                CREATE AN ACCOUNT
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default Login;