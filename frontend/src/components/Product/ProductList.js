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
            params.keyword = search || "";
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
            setLoading(false);
        } catch (err) {
            console.log("Error fetching products: " + err);
        }
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

    if (totalPages !== 0 && currentPage > totalPages - 1) {
        setCurrentPage(0);
    }

    const productList = products.map(product => {
        if (isLoading) {
            return (
                <div className="items-center">
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
        <div className="text-center w-[70%]">
            <div className="relative mt-5">
                <div>
                    <h1 className="text-3xl mb-5">{header()}</h1>
                </div>
                <div className="absolute top-0 left-20">
                    <ProductSort sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-[444px] place-items-center">
                {productList}
            </div>
            <ProductPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </div>
    );
}

export default ProductList;