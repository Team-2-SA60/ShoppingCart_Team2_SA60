import AppNavbar from "../components/AppNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import WishList from "../components/WishList/WishList";


const WishListPage = () => {

    const { checkSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {  
        getCustomer();
        // eslint-disable-next-line
    },[]);

    async function getCustomer() {
        const getCustomer = await checkSession();
        if (!getCustomer) navigate("/login");
    }
    
    return (
        <div>
            <AppNavbar />
            <div className='place-items-center'>
                <h1 className="text-3xl my-5">Your Wishlist</h1>
                <WishList />
            </div>
        </div>
    );
}

export default WishListPage;