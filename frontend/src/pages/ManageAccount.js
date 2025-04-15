import { Button } from 'reactstrap';
import AppNavbar from '../components/AppNavbar'
import { Link } from 'react-router-dom';
import Account from '../components/Account/Account';
import { useState } from 'react';

const ManageAccount = () => {
    
    const [activeTab, setActiveTab] = useState(0);
    const [logout, setLogout] = useState(false);
    
    return (
        <div>
            <AppNavbar logout={logout} />
            <div className='flex items-center justify-center min-h-[80vh] w-full'>
                <div className='bg-slate-100 w-[600px] p-2.5 rounded-xl border drop-shadow-md'>
                    <div className='grid grid-rows-1 grid-flow-col gap-4'>
                        <div className='place-content-center border-r-2 text-right'>
                            <Button onClick={() => setActiveTab(0)} color='link'
                                className='bg-transparent border-b-2 text-black mb-5'>
                                <span>Account</span>
                            </Button>
                            <Button tag={Link} to={"/wishlist"} 
                                className='bg-transparent border-0 text-black mb-5'>
                                <span className='text-nowrap'>My Wish List</span>
                            </Button>
                            <Button tag={Link} to={"/orders"}
                                className='bg-transparent border-0 text-black mb-5'>
                                <span className='text-nowrap'>My Orders</span>
                            </Button>
                            <Button onClick={() => setLogout(true)}
                                className='bg-transparent border-0 text-black'>
                                <span>Log Out</span>
                            </Button>
                        </div>
                        <div className='w-[460px]'>
                            <Account activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAccount;