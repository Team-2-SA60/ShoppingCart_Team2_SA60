import ProductList from "../components/Product/ProductList";
import AppNavbar from "../components/AppNavbar";


const HomePage = () => {

    return (
        <div>
            <AppNavbar />
            <div className='place-items-center'>
                <ProductList/>
            </div>
        </div>
    );
}

export default HomePage;