import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../utilities/axios";
import ProductCard from "./ProductCard"
import ProductPagination from "./ProductPagination";
import { Spinner } from "reactstrap";
import { useSession } from "../../context/SessionContext";
import ProductSort from "./ProductSort";



const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [wishListProducts, setWishList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { checkSession } = useSession();
    const [searchParams] = useSearchParams();
    const { category } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

   
    useEffect(() => {
        getCustomer();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setLoading(true);
        getProducts();
        // eslint-disable-next-line
    }, [searchParams, category, currentPage, sortBy, sortOrder]);

    async function getCustomer() {
        const getCustomer = await checkSession();
        if (getCustomer !== null) {
            getWishListProducts();
        }
    }

    function buildParams() {
        const size = 4;
        const search = searchParams.get("search");

        let params = {
            page: currentPage,
            size: size,
            sortBy: sortBy,
            sortOrder: sortOrder
        }
        
        if (search && !category) {
            params.keyword = encodeURIComponent(search) || "";
        }

        return params;
    }

    async function getProducts() {
        let fetchURL = "/products";
        if (category) {
            fetchURL += `/${category}`;
        }

        const params = buildParams();
        try {
            const response = await api.get(fetchURL, {params});
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.log("Error fetching products: " + err);
        }
        setLoading(false);
        return true;
    }

    async function getWishListProducts() {
        try {
            const response = await api.get("/wishlist/list")
            setWishList(response.data)
        } catch (err) {
            console.log("Error fetching wishlist: " + err)
        }
        return true;
    }

    function handlePageChange(e, pageNumber) {
        e.preventDefault();
        if (pageNumber < 0) {
            setCurrentPage(totalPages - 1);
            return;
        }
        setCurrentPage(pageNumber);
    }

    // During search or category filter, total pages may become less than current page
    // Following code helps to reset current page back to 0
    if (totalPages !== 0 && currentPage > totalPages - 1) {
        setCurrentPage(0);
    }

    const productList = products.map(product => {
        if (isLoading) {
            return (
                <div key={product.id} className="items-center w-[225px]">
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

    const header = () => {
        const search = searchParams.get("search");
        const endingStr = " T-Shirts"

        if (search) {
            return "'" + search + "'" + endingStr;
        } else if (category) {
            return category + endingStr;
        } else {
            return "All" + endingStr;
        }
    }

    if (products.length === 0 && !isLoading) {
        return (
            <div className="text-center w-[70%]">
                <h1 className="text-3xl mt-5 mb-5">{header()}</h1>
                <h4 className="text-red-700">!! No items found !!</h4>
            </div>
        )
    }

    return (
        // Prevent product list from going beyond NavBar width: Wrap in container with max width, centred, left-right padding of 4px
        <div className="max-w-screen-xl mx-auto px-4">
            <div className="relative text-center">
                <div className="relative mt-5">
                    <div>
                        <h1 className="text-3xl lg:mb-5">{header()}</h1>
                        <div className="place-items-center lg:hidden">
                            <ProductPagination currentPage={currentPage} totalPages={totalPages}
                                               handlePageChange={handlePageChange}/>
                        </div>
                    </div>
                    <div className="flex place-items-center mb-4 md:absolute md:top-0 md:left-15">
                        <ProductSort sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder}
                                     setSortOrder={setSortOrder} products={products}/>
                    </div>
                </div>
                <div
                    className="grid w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-24 h-[444px] place-items-center">
                    {productList}
                </div>
                <div className="hidden lg:block place-items-center mt-3">
                    <ProductPagination currentPage={currentPage} totalPages={totalPages}
                                       handlePageChange={handlePageChange}/>
                </div>
            </div>
        </div>
    );
}

export default ProductList;