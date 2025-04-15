import { useSession } from "../../context/SessionContext";
import api from "../../utilities/axios";

const ProductWishList = ({ product, wishListProducts, getWishListProducts }) => {

    const { customer } = useSession();

    async function handleWishList(e) {
        e.preventDefault();
        const addOk = await addToWishList();
        if (addOk) {
            getWishListProducts();
        }
    }

    async function addToWishList() {
        try {
            await api.post("/wishlist/add/" + product.id);
        } catch (err) {
            const statusCode = err.response?.status;
            
            if (statusCode === 403) {
                console.log("Customer not logged in");
                window.location.reload();
            } else if (statusCode === 417) {
                // Product already in wishlist
                console.log("Product already in wishlist, deleting instead");
                return await removeFromWishList();
            }
            return false;
        }
        return true;
    }

    async function removeFromWishList() {
        try {
            await api.delete("/wishlist/remove/" + product.id);
        } catch (err) {
            const statusCode = err.response?.status;

            if (statusCode === 403) {
                console.log("Customer not logged in");
            } else if (statusCode === 417) {
                console.log("Product not in customer's wishlist")
            }
            return false;
        }
        return true;
    }

    const isInWishlist = wishListProducts.some(wlProduct => wlProduct.id === product.id);

    if (!customer) {
        return;
    }

    return (
        <button onClick={handleWishList} className="absolute top-2 right-3 bg-white rounded-md drop-shadow-md border-1">
                <svg className="size-5 transition-all" viewBox="0 0 24 24">
                    <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        fill={isInWishlist ? "yellow" : "white"}   // Fills the star
                        stroke="black"    // Outline color
                        strokeWidth="0.5" // Outline thickness
                    />
                </svg>
        </button >
    )
}

export default ProductWishList;