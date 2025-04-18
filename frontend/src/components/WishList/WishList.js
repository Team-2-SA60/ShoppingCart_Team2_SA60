import { useEffect, useState } from "react";
import api from "../../utilities/axios";
import ProductCard from "../Product/ProductCard"
import ProductPagination from "../Product/ProductPagination";
import { Button, Spinner } from "reactstrap";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

const WishList = () => {

    const [products, setProducts] = useState([]);
    const [wishListProducts, setWishList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const { checkSession } = useSession();
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getCustomer();
        getWishListProducts();
        // eslint-disable-next-line
    }, []);

    async function getCustomer() {
        const getCustomer = await checkSession();
        if (!getCustomer) navigate("/login");
    }

    async function getWishListProducts() {
        try {
            const response = await api.get("/wishlist/list")
            setWishList(response.data);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.log("Error fetching wishlist: " + err)
        }
        return true;
    }

    const productsPerPage = 4;

    const indexOfFirstProduct = (currentPage + 1) * productsPerPage - productsPerPage
    const indexOfLastProduct = indexOfFirstProduct + productsPerPage

    const productsOnPage = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    function handlePageChange(e, pageNumber) {
        e.preventDefault();
        if (pageNumber < 0) {
            setCurrentPage(totalPages - 1);
            return;
        }
        if (pageNumber > totalPages - 1) {
            setCurrentPage(0);
            return;
        }
        setCurrentPage(pageNumber);
    }

    const productList = productsOnPage.map(product => {
        if (isLoading) {
            return (
                <div className="items-center w-[225px]">
                    <Spinner>
                        Loading...
                    </Spinner>
                </div>
            )
        }

        return (
            <ProductCard key={product.id} product={product} wishListProducts={wishListProducts} getWishListProducts={getWishListProducts} />
        )
    });

    if (products.length === 0 && !isLoading) {
        return (
            <div className="text-center w-[70%]">
                <h1 className="text-3xl mt-5 mb-5">Your Wishlist</h1>
                <h4 className="text-red-700">!! No items on your wishlist !!</h4>
                <Button className="mt-4" tag="a" href="/" color="primary">Browse for products</Button>
            </div>
        )
    }

    return (
        <div className="text-center">
            <h1 className="text-3xl mt-5 mb-5">Your Wishlist</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-24 h-[444px] place-items-center">
                {productList}
            </div>
            <ProductPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    );
}

export default WishList;