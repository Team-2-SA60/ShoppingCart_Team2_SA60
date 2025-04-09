import { useEffect } from "react";
import ProductList from "../components/Product/ProductList";
import { useSession } from "../context/SessionContext";
import AppNavbar from "../components/AppNavbar";


const HomePage = () => {
    const { checkSession } = useSession();

    useEffect(() => {
        checkSession();
        // eslint-disable-next-line
    },[]);

    return (
        <div>
            <AppNavbar />
            <div className='place-items-center'>
                <h1 className="text-3xl my-5">All T-Shirts</h1>
                <ProductList/>
            </div>
        </div>
    );
}

export default HomePage;