import { useEffect, useState } from "react";
import api from "../../utilities/axios";
import ProductCard from "../Product/ProductCard"
import ProductPagination from "../Product/ProductPagination";
import { Spinner } from "reactstrap";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

const WishList = () => {

    const [products, setProducts] = useState([]);
    const [wishListProducts, setWishList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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

    const indexOfFirstProduct = currentPage * productsPerPage - productsPerPage
    const indexOfLastProduct = indexOfFirstProduct + productsPerPage

    const productsOnPage = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const productList = productsOnPage.map(product => {
        return (
            <ProductCard key={product.id} product={product} wishListProducts={wishListProducts} getWishListProducts={getWishListProducts} />
        )
    });

    if (isLoading) {
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }

    if (products.length === 0) {
        return (
            <div className="items-center h-full">
                <h4 className="text-red-700">!! No items on your wishlist !!</h4>
            </div>
        )
    }

    return (
        <div className="text-center">
            <h1 className="text-3xl my-5">Your Wishlist</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-24 items-stretch">
                {productList}
            </div>
            <ProductPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    );
}

export default WishList;