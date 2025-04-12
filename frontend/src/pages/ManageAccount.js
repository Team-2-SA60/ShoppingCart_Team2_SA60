import { Button } from 'reactstrap';
import AppNavbar from '../components/AppNavbar'
import { Link } from 'react-router-dom';
import Account from '../components/Account/Account';

const ManageAccount = () => {
    
    
    return (
        <div>
            <AppNavbar />
            <div className='flex items-center justify-center min-h-[80vh] w-full'>
                <div className='bg-slate-100 w-[600px] p-2.5 rounded-xl border drop-shadow-md'>
                    <div className='grid grid-rows-1 grid-flow-col gap-4'>
                        <div className='place-content-center border-r-2 text-right'>
                            <Button tag={Link} to={"#"} color='link'
                                className='bg-transparent border-b-2 text-black mb-5'>
                                <span>Account</span>
                            </Button>
                            <Button tag={Link} to={"/orders"} 
                                className='bg-transparent border-0 text-black mb-5'>
                                <span className='text-nowrap'>My Orders</span>
                            </Button>
                            <Button tag={Link} to={"#"} 
                                className='bg-transparent border-0 text-black'>
                                <span>Log Out</span>
                            </Button>
                        </div>
                        <div className='w-[440px]'>
                            <Account />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageAccount;