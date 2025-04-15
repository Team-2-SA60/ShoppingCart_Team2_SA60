import AppNavbar from "../components/AppNavbar";
import WishList from "../components/WishList/WishList";


const WishListPage = () => {
    
    return (
        <div>
            <AppNavbar />
            <div className='place-items-center'>
                <WishList />
            </div>
        </div>
    );
}

export default WishListPage;